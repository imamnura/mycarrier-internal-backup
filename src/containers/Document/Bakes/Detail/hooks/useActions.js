import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDetailBakes,
  putBakesReviewer,
  putStatusBakes,
  uploadSignedBakes,
} from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';

const useActions = (props) => {
  const router = useRouter();
  const {
    query: { id: bakesId },
  } = router;

  const { feature } = props;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const { data } = await getDetailBakes(bakesId);
      setData(data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bakesId) {
      fetchDetail();
    }
  }, [bakesId]);

  const onEdit = async () => {
    try {
      await putStatusBakes({
        bakesId,
        data: {
          note: '',
          status: 'draft',
        },
      });

      router.push(route.bakes('create', bakesId));
    } catch (error) {
      setFailedAlert({
        message: error.message || 'Failed update bakes to draft',
      });
    }
  };

  const [popUp, _setPopUp] = useState({
    type: 'uploadSignedBakes',
    open: false,
  });
  const setPopUp = (val) => () => _setPopUp(val);
  const closePopUp = () => _setPopUp({ ...popUp, open: false });

  const setUploadSignedBakes = () => () => {
    _setPopUp({
      type: 'uploadSignedBakes',
      open: true,
    });
  };

  const onSubmitUploadSignedBakes = async ({ file: { file } }) => {
    setLoadingAlert();
    const payload = new FormData();
    payload.append('file', file);
    payload.append('bakesId', bakesId);

    try {
      const result = await uploadSignedBakes(payload);
      setData(result.data);
      setSuccessAlert({ message: 'BAKES successfully submitted' });
      closePopUp();
    } catch (error) {
      setFailedAlert({ message: error.message || 'BAKES failed to upload' });
    }
  };

  const onSubmitEditReviewer = async (data) => {
    setLoadingAlert();
    try {
      const result = await putBakesReviewer({ bakesId, data });
      setData(result.data);
      setSuccessAlert({ message: 'Reviewer successfully updated' });
      closePopUp();
    } catch (error) {
      setFailedAlert({ message: error.message || 'Reviwer failed to update' });
    }
  };

  const action = () => {
    let actions = [];

    if (['customer approval', 'approved'].includes(data?.status)) {
      actions.push({
        children: 'Use as template',
        onClick: () => router.push(route.bakes('create', data.bakesId)),
        variant: 'ghost',
      });
    }

    if (data?.status === 'returned') {
      actions.push({ children: 'EDIT BAKES', onClick: onEdit });
    }

    if (
      ['telkom approval', 'customer approval'].includes(data?.status) &&
      isHaveAccess(feature, 'read_use_as_template')
    ) {
      actions.push({
        // hideDivider: true,
        ml: 24,
        children: 'EDIT REVIEWER',
        onClick: setPopUp({ type: 'editReviewer', open: true }),
      });
    }

    return actions;
  };

  return {
    bakesId,
    closePopUp,
    data,
    feature,
    loading,
    onEdit,
    onSubmitUploadSignedBakes,
    popUp,
    setPopUp,
    setUploadSignedBakes,
    onSubmitEditReviewer,
    action,
  };
};

export default useActions;
