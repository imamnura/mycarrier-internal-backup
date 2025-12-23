import { useEffect, useState } from 'react';
import { isHaveAccess } from '@utils/common';
import {
  getDetailRole,
  deleteRole,
} from '@containers/Admin/Role/_repositories/repositories';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const { feature } = props;
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetail = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await getDetailRole(id);
      setData(data);
    } catch (e) {
      setData({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    id && fetchDetail(id);
  }, [id]);

  const fetchDelete = () => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      await deleteRole(data?.roleId);
      setSuccessAlert({ message: 'Role successfully deleted' });
      router.push({ pathname: route.role('list') });
    } catch (error) {
      setFailedAlert({
        message: error?.message || 'Failed to delete role',
      });
    }
  };

  const onDelete = () => {
    if (isHaveAccess(feature, 'delete_role')) {
      setConfirmation({
        message: 'Are you sure want to delete this role?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: fetchDelete() },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to delete role.`,
      });
    }
  };

  const onEdit = () => {
    router.push({ pathname: route.role('edit', data?.roleId) });
  };

  return {
    data,
    isLoading,
    onDelete,
    onEdit,
  };
};

export default useActions;
