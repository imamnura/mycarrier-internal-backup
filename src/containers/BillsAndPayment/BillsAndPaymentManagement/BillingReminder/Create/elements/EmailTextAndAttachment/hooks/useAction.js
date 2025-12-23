import { route } from '@configs/index';
import {
  deleteBillingReminderAttachment,
  postDraftBillingReminder,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import { cleanObject } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useQueryParams from '@utils/hooks/useQueryParams';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const useAction = (props) => {
  const { data, setTab, updateData, loading, onDiscard } = props;

  const router = useRouter();
  const {
    query: { bpNumber, count },
  } = router;
  const { enqueueSnackbar } = useSnackbar();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { closeDocumentViewer } = useDocumentViewer();
  const { queryParams } = useQueryParams();

  const reminderId = queryParams.id;

  const [value, setValue] = useState();
  const [attachment, setAttachment] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(null);

  useEffect(() => {
    if (data?.fileTemplate) {
      setValue(data.fileTemplate);
      // } else if (!value) {
      //   fetchTemplate();
    }
    if (data?.attachment) {
      setAttachment(data.attachment);
    }
  }, []);

  const onAddAttachment = (data) => {
    const fileData = data?.data;

    let remappedProduct = [];

    if (attachment.length > 0) {
      const isAxist = attachment.some(
        ({ fileName }) => fileName === fileData?.fileName,
      );

      if (isAxist) {
        setFailedAlert({ message: 'File document already exists' });
        return;
      }
    }
    remappedProduct.push(fileData, ...attachment);
    setAttachment(remappedProduct);
  };

  const fetchDeleteAttachment = (filePath) => async () => {
    closeConfirmation();
    setLoadingAlert();
    try {
      const { success } = await deleteBillingReminderAttachment({ filePath });
      if (success) {
        setSuccessAlert({ message: 'Document successfully deleted' });
        closeDocumentViewer();
        setAttachment(attachment.filter((v) => v?.filePath !== filePath));
      }
    } catch (error) {
      setFailedAlert({ message: error?.message });
    }
  };

  const onDeleteAttachment = (filePath) => () => {
    setConfirmation({
      message: 'Are you sure want to delete this document?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchDeleteAttachment(filePath) },
      ],
    });
  };

  // type: 'next' | 'draft' | 'previous
  const fetchDraft = async (type, destinationStep) => {
    setSubmitLoading(type);
    const _payload = {
      reminderId,
      step: '2',
      bpNumber,
      data: {
        fileTemplate: value,
      },
    };

    if (attachment.length > 0) {
      _payload.data = {
        ..._payload.data,
        attachment,
      };
    }

    const payload = cleanObject(_payload);

    try {
      const result = await postDraftBillingReminder(reminderId, payload);
      updateData(result.data);
      setTab(destinationStep);
      enqueueSnackbar('Document saved as draft.');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setSubmitLoading(false);
    }
  };
  const closeConfirmationPrevious = (destinationStep) => () => {
    closeConfirmation();
    setTab(destinationStep);
  };
  const submitHandler = ({ destinationStep, type }) => {
    if (type === 'cancel') {
      return () => router.push(route.billsAndPayment('detail', bpNumber));
    } else if (type === 'discard') {
      return () => {
        setSubmitLoading(false);
        onDiscard();
      };
    } else if (type === 'previous' && value != data?.fileTemplate) {
      return () =>
        setConfirmation({
          message: 'Are you sure that you want leave this form?',
          action: [
            { children: 'no', variant: 'ghost', onClick: closeConfirmation },
            {
              children: 'yes',
              onClick: closeConfirmationPrevious(destinationStep),
            },
          ],
        });
    } else if (value == data?.fileTemplate && attachment === data?.attachment) {
      return () => setTab(destinationStep);
    }
    return () => fetchDraft(type, destinationStep);
  };

  const onSubmit = (type) => {
    const destinationStep = {
      next: 3,
      draft: 2,
      previous: 1,
    }[type];

    return submitHandler({ type, destinationStep });
  };

  const onStepperClick = (_destinationStep) => {
    const destinationStep = _destinationStep + 1;
    const type = destinationStep > 2 ? 'next' : 'previous';
    submitHandler({ type, destinationStep })();
  };

  return {
    data,
    bpNumber,
    count,
    reminderId,
    loading,
    onStepperClick,
    onSubmit,
    submitLoading,
    value,
    setValue,
    attachment,
    setAttachment,
    onDeleteAttachment,
    onAddAttachment,
    fetchDeleteAttachment,
    closeConfirmationPrevious,
  };
};

export default useAction;
