import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getDetailModificationOrder,
  updateStatusModificationOrder,
} from '../../_repositories/repositories';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: orderNumber } = router.query;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [modalLinkBakes, setModalLinkBakes] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const result = await getDetailModificationOrder(orderNumber);
      const normalizeData = {
        ...result.data,
        existingProductCapacity: `${
          result.data?.upgradeDetail?.existingProductCapacity / 1000
        } Mbps`,
        modificationCapacity: `${
          result.data?.upgradeDetail?.modificationCapacity / 1000
        } Mbps`,
      };
      setData(normalizeData);
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  const fetchUpdateStatus = async ({ orderNumber, updateTo, success }) => {
    const data = {
      status: updateTo,
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateStatusModificationOrder(orderNumber, data);
      setSuccessAlert({
        message: success,
        onClose: () => fetchDetail(),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  useEffect(() => {
    if (orderNumber) {
      fetchDetail();
    }
  }, [orderNumber]);

  const action = () => {
    let actions = [];

    if (data?.status === 'Upgrade Request') {
      actions.push({
        children: 'RETURN',
        onClick: () =>
          setModalUpdateStatus({
            title: 'Please give note of return',
            caption:
              'Once you returned this, it will be process and data will be sent to customer automatically.',
            updateTo: 'returned',
            success: 'Upgrade request succesfully returned',
            confirmation: 'Are you sure want to return this upgrade?',
          }),
        variant: 'ghost',
      });
      actions.push({
        children: 'REJECT',
        onClick: () =>
          setModalUpdateStatus({
            title: 'Please give note of reject',
            caption:
              'Once you rejected this, it will be process and data will be sent to customer automatically.',
            updateTo: 'rejected',
            success: 'Upgrade request succesfully rejected',
            confirmation: 'Are you sure want to reject this upgrade?',
          }),
        variant: 'ghost',
      });
      actions.push({
        children: 'APPROVE REQUEST',
        onClick: () =>
          setConfirmation({
            message: 'Are you sure want to approve this request upgrade?',
            action: [
              {
                children: 'No',
                onClick: closeConfirmation,
                variant: 'ghost',
              },
              {
                children: 'Yes',
                onClick: () => {
                  fetchUpdateStatus({
                    orderNumber: data?.orderNumber,
                    updateTo: 'Review Bakes',
                    success: 'Request upgrade successfully approved',
                  });
                  closeConfirmation();
                },
              },
            ],
          }),
      });
    }
    if (data?.status === 'Review Bakes') {
      actions.push({
        children: 'approve upgrade',
        onClick: () => setModalLinkBakes(true),
      });
    }
    if (
      data?.status === 'Service Upgrading' &&
      !data?.worklog.find((w) => w.status === 'Preparing Upgrade')
    ) {
      actions.push({
        children: 'APPROVE',
        onClick: () =>
          setConfirmation({
            message: 'Are you sure want to approve this request upgrade?',
            action: [
              {
                children: 'No',
                onClick: closeConfirmation,
                variant: 'ghost',
              },
              {
                children: 'Yes',
                onClick: () => {
                  fetchUpdateStatus({
                    orderNumber: data?.orderNumber,
                    updateTo: 'Review Bakes',
                    success: 'Request upgrade successfully approved',
                  });
                  closeConfirmation();
                },
              },
            ],
          }),
      });
    }

    return actions;
  };

  return {
    fetchDetail,
    fetchUpdateStatus,
    orderNumber,
    data,
    feature,
    loading,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalLinkBakes,
    setModalLinkBakes,
    action,
  };
};

export default useAction;
