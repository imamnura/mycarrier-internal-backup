import { useEffect, useState } from 'react';
import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import {
  getDetailApprovalBillingReminder,
  putApprovalBillingReminder,
  putReturnBillingReminder,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { onDownloadFile, cleanObject } from '@utils/common';
import { capitalize } from '@utils/text';

const useAction = () => {
  const router = useRouter();

  const hash = router.query.id;

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [stateType, setStateType] = useState(null);

  const [fileTemplate, setFileTemplate] = useState('');

  useEffect(() => {
    if (data?.status === 'sent' || data?.isUserApproved) {
      setStateType('approved');
    }

    const findRejected = data?.reviewer.find((el) => el.status === 'reject');
    if (findRejected) {
      setStateType('rejected');
    }

    setFileTemplate(data?.fileTemplate);
  }, [data]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getDetailApprovalBillingReminder(hash);
      const resData = result.data;
      if (resData.status === 'draft') {
        setData(null);
      } else {
        setData(resData);
      }
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hash) {
      fetchDetail();
    }
  }, [hash]);

  const redirect = () =>
    router.push(
      route.billsAndPayment('detail', data?.customerInformation?.bpNumber),
    );

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [approvalForm, setApprovalForm] = useState({
    type: 'approve',
    title: '-',
    caption: '-',
    open: false,
  });

  const closeApprovalForm = () =>
    setApprovalForm({ ...approvalForm, open: false });

  const fetchUpdateStatus = (data) => async () => {
    setLoadingAlert();

    const payload =
      data.status === 'return'
        ? { ...data, approver: data?.approver?.data }
        : data;

    try {
      const result =
        data.status === 'return'
          ? await putReturnBillingReminder({ data: payload })
          : await putApprovalBillingReminder({ data: payload });
      setData(result.data);
      setSuccessAlert({ message: approvalForm.successMessage });
      closeApprovalForm();
      closeConfirmation();

      //render page
      setStateType(data?.status === 'approve' ? 'approved' : 'rejected');
    } catch (error) {
      closeConfirmation();
      setFailedAlert({ message: error.message });
    }
  };

  const onApprovalAction = (status) => () => {
    const formApprovalContent = {
      approved: {
        type: 'approve',
        statusPayload: 'approve',
        title: 'Please give note of approve',
        caption:
          'Once you approved this, it will be process and data will be sent to customer automatically.',
        successMessage: 'New Billing Reminder successfully approved',
        confirmation:
          'Are you sure want to approve this new Billing Reminder Approval?',
        open: true,
      },
      rejected: {
        type: 'rejected',
        statusPayload: 'reject',
        title: 'Please give note of reject',
        caption:
          'Once you rejected this, it will be process and data will be sent to customer automatically.',
        successMessage: 'New Billing Reminder successfully rejected',
        confirmation:
          'Are you sure want to reject this new Billing Reminder Approval?',
        open: true,
      },
      return: {
        type: 'return',
        statusPayload: 'return',
        title: 'Please give note of return',
        description: 'Please select the approver to return the document to:',
        successMessage: 'Document successfully returned',
        confirmation: 'Are you sure want to return this document?',
        open: true,
        labelForm: 'Reason for Returning document',
      },
    }[status];

    setApprovalForm(formApprovalContent);
  };

  const onSubmitFormApproval =
    (status) =>
    ({ reason, approver }) => {
      const params = cleanObject({
        reason,
        status,
        fileTemplate,
        hash,
        approver,
      });

      setConfirmation({
        message: approvalForm.confirmation,
        action: [
          { children: 'no', variant: 'ghost', onClick: closeConfirmation },
          {
            children: 'yes',
            onClick: fetchUpdateStatus(params),
          },
        ],
      });
    };

  const [editTemplate, _setEditTemplate] = useState(false);

  const setEditTemplate = (val) => () => {
    if (!val) {
      setFileTemplate(data.fileTemplate);
    }
    _setEditTemplate(val);
  };
  const { closeDocumentViewer, setDocumentViewer } = useDocumentViewer();

  const onSubmitDocumentApproval = (value) => {
    setFileTemplate(value);
    // _setEditTemplate(false);
    closeDocumentViewer();
    onApprovalAction('approved')();
  };

  const onSaveEdit = async (value) => {
    const data = {
      fileTemplate: value,
      hash,
      reason: '',
      status: 'edit',
    };
    setLoadingAlert();
    try {
      const result = await putApprovalBillingReminder({ data });
      setData(result.data);
      setSuccessAlert({ message: 'Success save document' });
      _setEditTemplate(false);
      setDocumentViewer({
        title: result?.data?.billReminderPdf?.fileName,
        url: result?.data?.billReminderPdf?.fileUrl,
        action: [
          { children: 'download', onClick: onDownloadFile },
          {
            children: 'edit document',
            onClick: setEditTemplate(true),
            withDivider: true,
            variant: 'ghost',
          },
          {
            children: 'approve',
            onClick: () => onSubmitDocumentApproval(result?.data?.fileTemplate),
            withDivider: false,
            ml: 12,
          },
        ],
      });
    } catch (error) {
      setFailedAlert({ message: error?.message || 'Failed to save document' });
    }
  };

  const optionsApprover = data?.reviewer
    .map(({ name, email, phoneNumber, position, status }, i) => ({
      label: capitalize(name),
      value: i + 1,
      data: {
        name: name,
        jobTitle: position,
        phoneNumber,
        email: email,
        approver: `Approver ${i + 1}`,
      },
      status: status || '',
      subLabel: `Approver ${i + 1}`,
      subLabelRemark: email,
    }))
    .filter((el, i) => i + 1 !== data?.stepApproval && el.status === 'approve');

  return {
    approvalForm,
    closeApprovalForm,
    data,
    editTemplate,
    fileTemplate,
    loading,
    onApprovalAction,
    onSubmitDocumentApproval,
    onSubmitFormApproval,
    redirect,
    setEditTemplate,
    stateType,
    setFileTemplate,
    fetchUpdateStatus,
    onSaveEdit,
    optionsApprover,
  };
};

export default useAction;
