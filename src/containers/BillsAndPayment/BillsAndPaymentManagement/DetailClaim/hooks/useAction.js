import { capitalize } from '@utils/text';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import {
  getDetailClaim,
  putStatusClaim,
} from '../../_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useAction = ({ feature }) => {
  const {
    query: { params: claimId, id: bpNumber },
  } = useRouter();
  const [loading, setLoading] = useState(true);
  const [_data, setData] = useState(null);

  const data = useMemo(() => {
    if (!_data) {
      return null;
    }

    return {
      ..._data,
      bpNumber,
      // claimCategory: `Dispute by ${capitalize(_data.claimCategory)}`,
      claimCategory:
        capitalize(_data.claimCategory) === 'DOCUMENT'
          ? 'Invoice document is not completed'
          : 'Invoice nominal is not correct',
      documents: [
        ..._data.customerDocument[0].documents,
        ..._data.customerDocument[1].documents,
        ..._data.customerDocument[2].documents,
        _data.internalDocument,
      ].map(({ fileUrlDownload, fileUrl, fileName }) => ({
        fileName,
        fileUrl: fileUrlDownload || fileUrl,
      })),
    };
  }, [_data]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getDetailClaim(claimId);
      setData(result.data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (claimId) {
      fetchDetail();
    }
  }, [claimId]);

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const [approvalForm, _setApprovalForm] = useState({
    type: 'cdm_checked',
    title: 'Please give note of approve',
    caption:
      'Once you approved this, it will be process and data will be sent to customer automatically.',
    confirmation: 'Are you sure want to approve this claim?',
    successMessage: 'Claim successfully approved',
    open: false,
  });

  const setApprovalForm = (val) => () => _setApprovalForm(val);

  const closeApprovalForm = () =>
    _setApprovalForm({ ...approvalForm, open: false });

  const [completeForm, _setCompleteForm] = useState({
    open: false,
  });

  const setCompleteForm = (val) => () => _setCompleteForm(val);

  const closeCompleteForm = () => _setCompleteForm({ open: false });

  const fetchUpdateStatus = (type, value) => async () => {
    setLoadingAlert();
    closeApprovalForm();
    closeCompleteForm();
    let payload;

    if (type === 'approval') {
      const { reason } = value;
      payload = { note: reason, status: approvalForm.type };
    } else if (type === 'complete') {
      const { evidence, note } = value;
      payload = {
        note,
        status: 'completed',
        ...evidence.data,
      };
    }

    try {
      const result = await putStatusClaim({ claimId, data: payload });
      closeConfirmation();
      setData(result.data);
      setSuccessAlert({ message: approvalForm.successMessage });
    } catch (error) {
      setFailedAlert({ message: error.message || 'Failed to update status' });
    }
  };

  const onSubmitFormApproval = (value) => {
    setConfirmation({
      message: approvalForm.confirmation,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchUpdateStatus('approval', value) },
      ],
    });
  };

  const onSubmitFormComplete = (value) => {
    setConfirmation({
      message: 'Are you sure want to approve this claim?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchUpdateStatus('complete', value) },
      ],
    });
  };

  return {
    approvalForm,
    closeApprovalForm,
    closeCompleteForm,
    completeForm,
    data,
    feature,
    fetchUpdateStatus,
    loading,
    onSubmitFormApproval,
    onSubmitFormComplete,
    setApprovalForm,
    setCompleteForm,
  };
};

export default useAction;
