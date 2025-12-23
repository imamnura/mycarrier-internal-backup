import { useEffect, useState } from 'react';
import { defaultConfirm } from '@constants/dialogDefaultValue';
import { useRouter } from 'next/router';
import {
  getDataMicrositeVisitNCX,
  updateStatusVisitNCX,
} from '../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { errorTitle } from '../constants';
import generateToken from '@utils/generateToken';

const useActions = () => {
  const router = useRouter();
  const { id, params, approverId } = router.query;
  const { setFailedAlert, setSuccessAlert } = usePopupAlert();

  const [isLoading, setLoading] = useState();
  const [detail, setDetail] = useState({});
  const [error, setError] = useState({});
  const [confirmation, setConfirmation] = useState(defaultConfirm);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);
  // const [modalAssign, setModalAssign] = useState(false);

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  const normalizeData = (res) => {
    const { document: _document } = res;
    const docsName = ['spk', 'ba', 'nda', 'additionalfile', 'photo'];
    let document = {};

    docsName.forEach(
      (name) =>
        (document = {
          [name]: _document.filter(
            (i) => i?.type?.replace(' ', '').toLowerCase() === name,
          ),
          ...document,
        }),
    );

    return { ...res, ...document };
  };

  const fetchDetail = async (micrositeId) => {
    try {
      setLoading(true);
      const accessTokenGenerate = await generateToken();
      const { data } = await getDataMicrositeVisitNCX(
        micrositeId,
        accessTokenGenerate,
      );
      setDetail(normalizeData(data));
    } catch (e) {
      setDetail({});
      setError({
        description: e?.message,
        message: errorTitle[e?.code],
      });
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => fetchDetail(id);

  const fetchUpdateStatus = async (data) => {
    const { status } = data;
    const payload = {
      ...data,
      approvalName: approverId,
    };

    try {
      const accessTokenGenerate = await generateToken();
      await updateStatusVisitNCX(id, payload, accessTokenGenerate);
      setSuccessAlert({
        message: `Visit request successfully ${status}`,
        onClose: onClose,
      });
    } catch (e) {
      setFailedAlert({
        message: e?.message,
      });
    }
  };

  const actionApprove = (type) => () => {
    fetchUpdateStatus({ status: 'approved', type });
    clearConfirmation();
  };

  const onClickApprove = (params) => {
    const type = {
      am: 'account_manager',
      marketing: 'marketing',
      occ: 'occ',
    }[params];

    const actions = [
      { label: 'No', action: clearConfirmation },
      { label: 'Yes', action: actionApprove(type) },
    ];

    switch (params) {
      case 'marketing':
        setConfirmation({
          actions,
          content: 'Are you sure want to assign this visit request to AM?',
        });
        break;
      case 'am':
      case 'occ':
        setConfirmation({
          actions,
          content: 'Are you sure want to approve this visit request?',
        });
        break;
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id]);

  return {
    actionApprove,
    clearConfirmation,
    confirmation,
    setConfirmation,
    detail,
    error,
    fetchUpdateStatus,
    isLoading,
    modalUpdateStatus,
    setModalUpdateStatus,
    // modalAssign, setModalAssign,
    onClickApprove,
    onClose,
    params,
  };
};

export default useActions;
