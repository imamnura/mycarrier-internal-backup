import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { dateFormat } from '@utils/parser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDetailApprovalSettlement,
  updateApprovalSettlement,
} from '../../_repositories/repositories';

const useAction = () => {
  const router = useRouter();

  const hash = router.query.id;

  const [data, _setData] = useState(null);

  const setData = (d) => {
    if (d) {
      _setData({
        ...d,
        // createdDate: dateFormat({ date: d?.worklog?.at(-1)?.createdAt, type: 'date-time', empty: '-' }),
        createdDate: dateFormat({
          date: d?.createdDate,
          type: 'date-time',
          empty: '-',
        }),
        isLastReviewer:
          d?.reviewer?.length > 1
            ? Boolean(d.reviewer[d.reviewer.length - 2].note)
            : true,
      });
    } else {
      _setData(d);
    }
  };

  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const { data } = await getDetailApprovalSettlement(hash);
      setData(data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hash) {
      fetchDetail();
    }
  }, [hash]);

  const redirect = () =>
    router.push(route.settlement('detailSettlementList', data.settlementId));

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [approvalForm, setApprovalForm] = useState({
    type: 'approved',
    title: '-',
    caption: '-',
    open: false,
  });

  const closeApprovalForm = () =>
    setApprovalForm({ ...approvalForm, open: false });

  const fetchUpdateStatus = (_data) => async () => {
    setLoadingAlert();
    try {
      await updateApprovalSettlement(hash, _data);
      await fetchDetail();
      setSuccessAlert({ message: approvalForm.successMessage });
      closeApprovalForm();
      closeConfirmation();
    } catch (error) {
      closeConfirmation();
      setFailedAlert({ message: 'Failed to update status' });
    }
  };

  const onApprovalAction = (status) => () => {
    const formApprovalContent = {
      rejected: {
        type: 'rejected',
        title: 'Please give note of reject',
        caption:
          'Once you rejected this, it will be process and data will be sent to customer automatically.',
        successMessage: 'New Settlement request successfully rejected',
        confirmation:
          'Are you sure want to reject this new Settlement request?',
        open: true,
      },
      returned: {
        type: 'returned',
        title: 'Please give note of return',
        caption:
          'Once you returned this, it will be process and data will be sent to customer automatically.',
        successMessage: 'New Settlement request successfully returned',
        confirmation:
          'Are you sure want to return this new Settlement request?',
        open: true,
      },
      approved: {
        type: 'approved',
        title: 'Please give note of approve',
        caption:
          'Once you approved this, it will be process and data will be sent to customer automatically.',
        successMessage: 'New Settlement request successfully approved',
        confirmation:
          'Are you sure want to approve this new Settlement request?',
        open: true,
      },
    }[status];

    setApprovalForm(formApprovalContent);
  };

  const onSubmitFormApproval =
    (status) =>
    ({ reason }) => {
      setConfirmation({
        message: approvalForm.confirmation,
        action: [
          { children: 'no', variant: 'ghost', onClick: closeConfirmation },
          {
            children: 'yes',
            onClick: fetchUpdateStatus({ note: reason, status }),
          },
        ],
      });
    };

  return {
    approvalForm,
    closeApprovalForm,
    data,
    fetchUpdateStatus,
    loading,
    onApprovalAction,
    onSubmitFormApproval,
    redirect,
  };
};

export default useAction;
