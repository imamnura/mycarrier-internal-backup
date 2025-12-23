import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailBrochure,
  deleteBrochure,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { dateFormat } from '@utils/parser';

const useActions = (props) => {
  const { feature } = props;
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [loading, setLoading] = useState(false);
  const [detailBrochure, setDetailBrochure] = useState({});

  const normalizeDetail = (data) => {
    return {
      ...data,
      document: {
        fileUrl: data?.path,
        fileName: data?.name,
      },
      createdAt: dateFormat({
        date: data?.createdAt,
        type: 'full-string-date',
      }),
    };
  };

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const { data } = await getDetailBrochure(id);
      setDetailBrochure(normalizeDetail(data));
    } catch (error) {
      setFailedAlert({
        message: error?.message || 'Failed to get detail brochure',
      });
    } finally {
      setLoading(false);
    }
  };

  const redirectList = () => () =>
    `${router.push('/homepage-management')}?type=brochure`;

  const onDelete = () => async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      const { success } = await deleteBrochure(id);
      success &&
        setSuccessAlert({
          message: 'Brochure was successfully deleted',
          onClose: redirectList(),
        });
    } catch (error) {
      setFailedAlert({ message: `Failed to Delete Brochure` });
    }
  };

  const confirmDelete = () => {
    if (isHaveAccess(feature, 'delete_brochure')) {
      setConfirmation({
        message: 'Are you sure want to delete this brochure?',
        action: [
          { children: 'no', variant: 'ghost', onClick: closeConfirmation },
          { children: 'yes', onClick: onDelete() },
        ],
      });
    } else {
      setFailedAlert({
        message: `You don't have permission to delete this brochure.`,
      });
    }
  };

  const editBrochure = (brochureId) => {
    if (isHaveAccess(feature, 'update_brochure')) {
      router.push(route.brochure('edit', brochureId));
    } else {
      setFailedAlert({
        message: `You don't have permission to edit this brochure.`,
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  return {
    loading,
    detailBrochure,
    editBrochure,
    confirmDelete,
    onDelete,
    redirectList, // for testing
  };
};

export default useActions;
