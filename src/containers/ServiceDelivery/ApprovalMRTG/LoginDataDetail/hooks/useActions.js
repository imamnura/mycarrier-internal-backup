import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  deleteLoginData,
  getDetailLoginData,
} from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';

const useAction = (props) => {
  const { feature } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalAddLoginData, setModalAddLoginData] = useState(null);

  const { id: customerAccountNumber, params: loginDataId } = router.query;

  const fetchDetail = async (id) => {
    const validatePath =
      router.asPath ===
      route.mrtg('login-data', customerAccountNumber, loginDataId);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailLoginData(id);
        setData(data);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const onCloseAfterDelete = () => () =>
    router.push(route.mrtg('detail', customerAccountNumber));

  const fetchDeleteLoginData = () => async () => {
    closeConfirmation();
    setLoadingAlert();

    try {
      await deleteLoginData(loginDataId);
      setSuccessAlert({
        message: 'Login data successfully deleted',
        onClose: onCloseAfterDelete(),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  useEffect(() => {
    if (customerAccountNumber && loginDataId) {
      if (isHaveAccess(feature, 'read_detail_login_data')) {
        fetchDetail(loginDataId);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [customerAccountNumber, loginDataId]);

  const handleDeleteLoginData = () => {
    const confirmation = {
      message: 'Are you sure want to delete this Login Data?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchDeleteLoginData() },
      ],
    };

    setConfirmation(confirmation);
    setModalAddLoginData(false);
  };

  const action = () => {
    let actions = [];

    if (data?.status === 'ON PROGRESS') {
      if (isHaveAccess(feature, 'update_login_data')) {
        actions.push({
          children: 'add login data',
          onClick: () =>
            setModalAddLoginData({
              textInfo:
                'Data will be sent according that has been requested by customer',
              confirmation: 'Are you sure this login data was correct?',
              success: 'Login data successfully added',
              title: 'Please filled Login Data to be sent to customer',
            }),
        });
      }
    }

    if (data?.status === 'COMPLETED') {
      if (isHaveAccess(feature, 'update_login_data')) {
        actions.push({
          // hideDivider: true,
          children: 'EDIT LOGIN DATA',
          variant: 'ghost',
          onClick: () =>
            setModalAddLoginData({
              textInfo:
                'Data will be sent according that has been requested by customer',
              confirmation: 'Are you sure want to edit this login data?',
              success: 'Login data successfully edited',
              title: 'Editing Login Data',
              data: data,
            }),
        });
      }
      if (isHaveAccess(feature, 'delete_login_data')) {
        actions.push({
          // hideDivider: true,
          ml: 24,
          children: 'DELETE LOGIN DATA',
          variant: 'ghost',
          onClick: () => handleDeleteLoginData(),
        });
      }
    }

    return actions;
  };

  return {
    action,
    customerAccountNumber,
    loginDataId,
    data,
    loading,
    fetchDetail,
    modalAddLoginData,
    setModalAddLoginData,
    handleDeleteLoginData,
    fetchDeleteLoginData,
    onCloseAfterDelete,
  };
};

export default useAction;
