import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getDetailPopUp,
  deletePopUp,
  updatePopUp,
} from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { isHaveAccess, titleCapitalize } from '@utils/common';
import { route } from '@configs';
import { dateFormat } from '@utils/parser';

const useAction = (props) => {
  const { feature } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const router = useRouter();

  const { id } = router.query;
  const routeList = {
    pathname: route.homepageManagement('list'),
    query: { type: 'popup' },
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const onCloseSuccess = () => fetchDetail(data?.id);

  const fetchDetail = async (id) => {
    const validatePath = router.asPath === route.popUp('detail', id);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailPopUp(id);

        const formattedPeriod =
          data?.period === 'by period'
            ? `${dateFormat({
                date: data?.startPeriod,
                type: 'date',
              })} - ${dateFormat({
                date: data?.endPeriod,
                type: 'date',
              })}`
            : titleCapitalize(data?.period);

        const formattedImageUrl = data?.imageUrl?.mediaPath
          ? {
              imageUrl: {
                fileUrl: data.imageUrl.mediaPath,
                fileName: data.imageUrl.mediaName,
              },
            }
          : {};

        setData({
          ...data,
          period: formattedPeriod,
          ...formattedImageUrl,
        });
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchUpdateStatus = (id, status) => async () => {
    closeConfirmation();
    setLoadingAlert();

    try {
      await updatePopUp(id, {
        status: status === 'active' ? 'inactive' : 'active',
      });
      setSuccessAlert({
        message:
          status === 'active'
            ? 'Pop Up Successfully Deactived'
            : 'Pop Up Successfully Actived',
        onClose: onCloseSuccess,
      });
    } catch (error) {
      setFailedAlert({
        message: error?.message,
      });
    }
  };

  const fetchDelete = () => async () => {
    closeConfirmation();
    setLoadingAlert();

    try {
      await deletePopUp(data?.id);
      setSuccessAlert({ message: 'Pop Up Successfully Deleted' });
      router.push(routeList);
    } catch (error) {
      setFailedAlert({
        message: error?.message,
      });
    }
  };

  useEffect(() => {
    if (id) {
      if (isHaveAccess(feature, 'read_detail_popup_banner')) {
        fetchDetail(id);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
        setLoading(false);
      }
    }
    return () => {
      setData(null);
    };
  }, [id]);

  const breadcrumb = [
    { label: 'Homepage Management', url: routeList },
    { label: data?.id || id },
  ];

  const onClickDelete = () =>
    setConfirmation({
      message: 'Are you sure you want to Delete this Pop Up?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchDelete() },
      ],
    });

  const onClickEdit = () => router.push(route.popUp('edit', data?.id));

  const onClickUpdateStatus = (id, status) => () =>
    setConfirmation({
      message:
        status === 'active'
          ? 'Are you sure you want to deactivate this pop up?'
          : 'Are you sure you want to activate this pop up?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchUpdateStatus(id, status) },
      ],
    });

  return {
    data,
    loading,
    breadcrumb,
    onClickDelete,
    onClickEdit,
    onClickUpdateStatus,
    onCloseSuccess,
    fetchDelete, //fortesting
    fetchUpdateStatus, //fortesting
  };
};

export default useAction;
