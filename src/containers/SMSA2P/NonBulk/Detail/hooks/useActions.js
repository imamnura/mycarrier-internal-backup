import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetailNonBulk } from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';

const useAction = (props) => {
  const { feature } = props;

  const { setFailedAlert } = usePopupAlert();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);

  const { id: orderNumber } = router.query;

  const fetchDetail = async (id) => {
    const validatePath = router.asPath === route.nonBulk('detail', id);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailNonBulk(id);
        setData(data);
      } catch (error) {
        if (
          ['You are not allowed to access this menu!'].includes(error.message)
        ) {
          setFailedAlert({
            message: error.message,
          });
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const action = () => {
    let actions = [];

    if (data?.orderInformation?.status === 'On Progress') {
      if (isHaveAccess(feature, 'edit_non_bulk')) {
        actions.push({
          children: 'Edit',
          variant: 'ghost',
          onClick: () => onClickEdit(data?.orderInformation?.orderNumber),
        });
      }
      if (isHaveAccess(feature, 'update_complete')) {
        actions.push({
          children: 'Complete',
          onClick: () =>
            setModalUpdateStatus({
              caption:
                'Once you confirmed this, it will be process and data will be sent to customer automatically.',
              confirmation: 'Are you sure want to complete this request?',
              success: 'Non Bulk activation request succesfully completed',
              title: 'Please give note of complete',
              updateTo: 'Completed',
            }),
        });
      }
    }

    return actions;
  };

  useEffect(() => {
    if (orderNumber) {
      if (isHaveAccess(feature, 'read_detail_non_bulk')) {
        fetchDetail(orderNumber);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [orderNumber]);

  const onClickEdit = (id) => router.push(route.nonBulk('edit', id));

  const onClickDetailCampaign = (id, params) =>
    router.push(route.nonBulk('campaign', id, params));

  return {
    onClickEdit,
    onClickDetailCampaign,
    orderNumber,
    data,
    loading,
    action,
    fetchDetail,
    modalUpdateStatus,
    setModalUpdateStatus,
  };
};

export default useAction;
