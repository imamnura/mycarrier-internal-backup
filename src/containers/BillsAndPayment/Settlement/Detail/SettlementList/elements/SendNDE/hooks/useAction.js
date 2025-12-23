import {
  generateDocument,
  getManagerPosition,
  updateStatusSettlementList,
  getListRecepientCC,
  deleteCC,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { onDownloadFile } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = ({
  open,
  onClose,
  setDetailData,
  defaultApprovalType,
  onAddCC,
  recepientCC,
  setRecepientCC,
}) => {
  const router = useRouter();

  const settlementId = router.query.id;

  const { control, handleSubmit, watch, setValue, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
    defaultValues: {
      type: defaultApprovalType,
      accountManager: {
        phoneNumber: '+62',
      },
      reviewer: [{ phoneNumber: '+62' }],
    },
  });

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setSuccessAlert, setLoadingAlert, setFailedAlert } = usePopupAlert();
  const { setDocumentViewer, closeDocumentViewer } = useDocumentViewer();

  const fetchSubmitDocument = (data) => async () => {
    setLoadingAlert();
    closeConfirmation();

    const payload = {
      status: 'am_approved',
      data,
    };

    try {
      const result = await updateStatusSettlementList(settlementId, payload);
      closeDocumentViewer();
      setDetailData(result.data);
      onClose();
      setSuccessAlert({ message: 'NDE document successfully sended' });
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onSendDocument = (value) => () =>
    setConfirmation({
      message: 'Are you sure want to send this NDE document to CDM?',
      action: [
        {
          children: 'no',
          onClick: closeConfirmation,
          variant: 'ghost',
        },
        {
          children: 'yes',
          onClick: fetchSubmitDocument(value),
        },
      ],
    });

  const [edit, _setEdit] = useState({ open: false, template: '', payload: {} });
  const setEdit = (val) => () => _setEdit(val);

  const fileDownload = (file) => () => onDownloadFile(file);

  const onSubmitEdit = async (value) => {
    setLoadingAlert();
    const payload = {
      ...edit.payload,
      data: {
        ...edit.payload.data,
        fileTemplate: value,
      },
    };

    try {
      const result = await generateDocument(settlementId, payload);

      const data = {
        fileUrl: result.data.fileUrl,
      };

      await setDocumentViewer({
        title: result.data.fileName,
        url: result.data.fileUrl,
        action: [
          {
            children: 'edit nde',
            onClick: setEdit({
              open: true,
              template: result.data.fileTemplate,
              payload: payload,
            }),
            variant: 'ghost',
          },
          {
            children: 'download nde',
            onClick: fileDownload(result.data.fileUrl),
            variant: 'ghost',
            withDivider: true,
          },
          {
            children: 'cancel',
            withDivider: true,
            onClick: closeDocumentViewer,
            variant: 'ghost',
          },
          {
            children: 'send nde to cdm',
            onClick: onSendDocument(data),
          },
        ],
      });
      await _setEdit({ open: false });
      await closeConfirmation();
      await setSuccessAlert({ message: 'NDE document successfully saved' });
    } catch (error) {
      setFailedAlert({ message: error.message });
      closeConfirmation();
    }
  };

  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const onSubmit = async (value) => {
    setLoadingGenerate(true);
    const {
      accountManager,
      reviewer,
      generalManager: { data: generalManager },
    } = value;

    const payload = {
      type: 'nde',
      data: {
        accountManager,
        reviewer: approvalType == '2' ? [] : reviewer,
        generalManager,
      },
    };

    try {
      const result = await generateDocument(settlementId, payload);

      const data = {
        fileUrl: result.data.fileUrl,
      };

      setLoadingGenerate(false);
      setDocumentViewer({
        title: result.data.fileName,
        url: result.data.fileUrl,
        action: [
          {
            children: 'edit nde',
            onClick: setEdit({
              open: true,
              template: result.data.fileTemplate,
              payload: payload,
            }),
            variant: 'ghost',
          },
          {
            children: 'download nde',
            onClick: fileDownload(result.data.fileUrl),
            variant: 'ghost',
            withDivider: true,
          },
          {
            children: 'cancel',
            withDivider: true,
            onClick: closeDocumentViewer,
            variant: 'ghost',
          },
          {
            children: 'send nde to cdm',
            onClick: onSendDocument(data),
          },
        ],
      });
    } catch (error) {
      setLoadingGenerate(false);
      setFailedAlert({ message: error.message });
    }
  };

  const [managerPositionOption, setManagerPositionOption] = useState([]);

  const fetchManagerPosition = async () => {
    try {
      const result = await getManagerPosition();
      setManagerPositionOption(
        result.data.map(
          ({
            email,
            phoneNumber,
            name: generalManagerName,
            position: generalManagerPosition,
          }) => ({
            label: generalManagerPosition,
            value: generalManagerPosition,
            data: {
              phoneNumber,
              email,
              generalManagerPosition,
              generalManagerName,
            },
          }),
        ),
      );
    } catch (error) {
      setManagerPositionOption([]);
    }
  };

  // const [recepientCC, setRecepientCC] = useState([]);

  const fetchListRecepientCC = async () => {
    try {
      const result = await getListRecepientCC(settlementId);
      setRecepientCC(result.data);
    } catch (error) {
      setFailedAlert({ message: error.data });
      setRecepientCC([]);
    }
  };

  useEffect(() => {
    fetchManagerPosition();
    if (settlementId) fetchListRecepientCC();
  }, [settlementId]);

  const approvalType = watch('type');

  const [type, setType] = useState('');

  const onSubmitType = () => {
    setValue('type', type);
  };

  const closeAllPopUp = () => {
    onClose();
    closeConfirmation();
    reset();
    setType(null);
  };

  const onCancel = () =>
    setConfirmation({
      message: 'Are you sure want to cancel and save changes?',
      action: [
        {
          children: 'no',
          onClick: closeConfirmation,
          variant: 'ghost',
        },
        {
          children: 'yes',
          onClick: closeAllPopUp,
        },
      ],
    });

  const {
    fields: reviewerFields,
    append,
    remove,
  } = useFieldArray({
    control,
    shouldUnregister: true,
    name: 'reviewer',
  });

  const onAddRecipient = () => {
    append({ name: '', email: '', position: '', phoneNumber: '+62' });
  };

  const onDeleteReviewer = (index) => () => {
    remove(index);
  };

  const fetchDeleteCC = (data) => async () => {
    const payload = {
      settlementId,
      name: data,
    };

    try {
      const result = await deleteCC(payload);
      if (result.success) setRecepientCC(result.data);
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  return {
    approvalType,
    closeAllPopUp,
    control,
    edit,
    fetchSubmitDocument,
    fileDownload,
    handleSubmit,
    loadingGenerate,
    managerPositionOption,
    onAddRecipient,
    onCancel,
    onDeleteReviewer,
    onSubmit,
    onSubmitEdit,
    onSubmitType,
    open,
    reviewerFields,
    setEdit,
    setType,
    type,
    onSendDocument,
    recepientCC,
    onAddCC,
    fetchDeleteCC,
  };
};

export default useAction;
