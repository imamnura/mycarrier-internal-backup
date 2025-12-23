import { useEffect, useState } from 'react';
import { isHaveAccess } from '@utils/common';
import {
  getIsUsedPrivilege,
  deleteJourney,
  getDetailPrivilege,
} from '@containers/Admin/Privilege/_repositories/repositories';
import { useRouter } from 'next/router';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useAction = ({ feature }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewPrivilege, setPreviewPrivilege] = useState({
    data: [],
    loading: true,
  });

  const fetchDetail = async (journeyId) => {
    try {
      setIsLoading(true);
      const { data } = await getDetailPrivilege(journeyId);
      setData(data);

      const res = data?.category.map(({ isChecked, title, feature }) => {
        return {
          title,
          isChecked,
          child: feature.map(({ isChecked, name, function: func }) => ({
            title: name,
            isChecked,
            child: func.map(({ isChecked, title, description }) => ({
              title: title,
              isChecked,
              subTitle: description,
            })),
          })),
        };
      });
      setPreviewPrivilege((prev) => ({ ...prev, loading: false, data: res }));
    } catch (e) {
      setData({});
      setPreviewPrivilege((prev) => ({ ...prev, loading: false, data: [] }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    id && fetchDetail(id);
  }, [id]);

  const onCancel = () => router.push(route.privilege('list'));

  const fetchDelete = async () => {
    try {
      await deleteJourney(data?.roleId);
      setSuccessAlert({
        message: 'Privilege successfully deleted',
        onClose: () => onCancel(),
      });
    } catch (error) {
      setFailedAlert({
        message: error?.message || 'Failed to delete privilege',
      });
    }
  };

  const checkPrivilege = () => async () => {
    setConfirmation();
    setLoadingAlert();

    const params = {
      type: 'journey',
      id: data?._id,
    };

    try {
      const result = await getIsUsedPrivilege(params);
      !result?.data?.isUsed && fetchDelete();
    } catch (error) {
      setFailedAlert({
        message:
          error?.message || 'Failed to check privilege before delete privilege',
      });
    }
  };

  const onDelete = () => {
    if (isHaveAccess(feature, 'delete_privilege')) {
      setConfirmation({
        message: 'Are you sure want to delete this privilege?',
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: checkPrivilege() },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to delete privilege.`,
      });
    }
  };

  const onEdit = () => {
    if (isHaveAccess(feature, 'update_privilege_management')) {
      router.push({ pathname: route.privilege('edit', data?.journeyId) });
    } else {
      setFailedAlert({
        message: `You don't have permission to edit privilege.`,
      });
    }
  };

  return {
    onEdit,
    onDelete,
    isLoading,
    data,
    previewPrivilege,
  };
};

export default useAction;
