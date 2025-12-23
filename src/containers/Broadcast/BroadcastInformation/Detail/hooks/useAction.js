import { cleanObject } from '@utils/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDetailBroadcastInformation,
  updateStatusBroadcast,
} from '../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { route } from '@configs';

const useAction = (props) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const { feature } = props;

  const [data, setData] = useState({ broadcastInfo: { attachment: {} } });
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const result = await getDetailBroadcastInformation(id);
      const { broadcastInfo } = result.data;
      const { paragraph1, paragraph2, paragraph3 } = broadcastInfo.message;

      const newMessage = paragraph1
        ? [paragraph1, paragraph2, paragraph3]
        : broadcastInfo.message;
      broadcastInfo.message = newMessage;

      broadcastInfo.contactGroup = broadcastInfo.contactGroup?.join(', ');
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setData({ broadcastInfo: { attachment: {} } });
      setLoading(false);
    }
  };

  const [approvalForm, _setApprovalForm] = useState({
    type: 'approve',
    title: 'Please give note of approve',
    caption:
      'Once you approved this, it will be process and data will be sent to CDM automatically.',
    open: false,
  });

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const setApprovalForm = (val) => () => _setApprovalForm(val);

  const closeApprovalForm = () =>
    _setApprovalForm({ ...approvalForm, open: false });

  const fetchUpdateStatus =
    ({ reason }) =>
    async () => {
      setLoadingAlert(true);

      const _payload = {
        broadcastId: id,
        status: approvalForm.type === 'approve' ? 'finish' : approvalForm.type,
        note: reason,
      };

      const payload = cleanObject(_payload);

      try {
        const result = await updateStatusBroadcast(payload);
        if (result.data) {
          const newData = {
            ...data,
            broadcastInfo: {
              ...data.broadcastInfo,
              ...result.data,
            },
          };
          setData(newData);
          setSuccessAlert({
            message: `Broadcast message succesfully ${approvalForm.type}`,
          });
          closeConfirmation();
          closeApprovalForm();
        }
      } catch (error) {
        setFailedAlert({
          message: 'Failed to update status broadcast information',
        });
      }
    };

  const onSubmitFormApproval = (value) => {
    setConfirmation({
      message: approvalForm.confirmation,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchUpdateStatus(value) },
      ],
    });
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  const [loadingUpdateReturn, setLoadingUpdateReturn] = useState(false);

  const updateFromReturned = async () => {
    setLoadingUpdateReturn(true);
    try {
      const result = await updateStatusBroadcast({
        broadcastId: id,
        status: 'preparation',
      });

      if (result.data) {
        router.push(route.broadcastInformation('create', id));
      }

      setLoadingUpdateReturn(false);
    } catch (error) {
      setFailedAlert({
        message: 'Failed to update status broadcast information',
      });
      setLoadingUpdateReturn(false);
    }
  };

  const updateWithoutApproval = async () => {
    router.push(`${route.broadcastInformation('create', id)}&edit=true`);
  };

  return {
    approvalForm,
    closeApprovalForm,
    data,
    feature,
    fetchUpdateStatus,
    loading,
    loadingUpdateReturn,
    onSubmitFormApproval,
    setApprovalForm,
    updateFromReturned,
    updateWithoutApproval,
  };
};

export default useAction;
