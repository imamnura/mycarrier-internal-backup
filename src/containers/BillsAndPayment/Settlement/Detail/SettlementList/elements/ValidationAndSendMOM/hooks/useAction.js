import {
  generateDocument,
  updateStatusSettlementList,
  reassignCustomer,
} from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
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
  defaultValues,
  detailData,
}) => {
  const router = useRouter();

  const settlementId = router.query.id;

  const { control, handleSubmit, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
    defaultValues: {
      customerSign: [{ phoneNumber: '+62' }],
    },
  });

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setSuccessAlert, setLoadingAlert, setFailedAlert } = usePopupAlert();

  const [step, setStep] = useState(1);
  const [formResult, setFormResult] = useState({});

  const [generateLoading, setGenerateLoading] = useState(false);
  const [rawMomDocument, setRawMomDocument] = useState(null);

  const onSubmitValidation = async (value) => {
    const val = value?.customerSign?.map((data) => {
      delete data.emailStatus;
      return data;
    });
    if (val) setFormResult(val);
    const payload = {
      type: 'mom',
      // data: value
    };

    setGenerateLoading(true);

    try {
      const result = await generateDocument(settlementId, payload);
      setRawMomDocument(result.data);
      setFormResult(value);
      setStep(2);
    } catch (error) {
      setFailedAlert({ message: error.message });
    } finally {
      setGenerateLoading(false);
    }
  };

  const onPrevious = () => setStep(1);

  const [momDocument, setMomDocument] = useState(null);

  const fetchSubmitDocument = async () => {
    setLoadingAlert();
    closeConfirmation();

    const { customerSign } = formResult;

    const _payload = {
      data: {
        customerSign,
        ...momDocument?.data,
      },
      // status: 'am_send_mom'
    };

    const payload =
      detailData?.status == 'cdm_generate_settlement'
        ? { ..._payload, status: 'am_send_mom' }
        : _payload;

    const message =
      {
        am_send_mom: 'Customer successfully reassigned',
        cdm_generate_settlement:
          'MOM document successfully created & sended to Customer',
      }[detailData?.status] ||
      'MOM document successfully created & sended to Customer';

    try {
      let result = {};
      if (detailData?.status == 'cdm_generate_settlement') {
        result = await updateStatusSettlementList(settlementId, payload);
      } else {
        result = await reassignCustomer(settlementId, payload);
      }
      setDetailData(result.data);
      onClose();
      setSuccessAlert({
        message: message,
      });
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onSendDocument = () => {
    const message =
      {
        am_send_mom: 'Are you sure want to reassign Customer?',
        cdm_generate_settlement:
          'Are you sure want to create & send this MOM document?',
      }[detailData?.status] ||
      'Are you sure want to create & send this MOM document?';

    setConfirmation({
      message,
      action: [
        {
          children: 'no',
          onClick: closeConfirmation,
          variant: 'ghost',
        },
        {
          children: 'yes',
          onClick: fetchSubmitDocument,
        },
      ],
    });
  };

  const closeAllPopUp = () => {
    onClose();
    closeConfirmation();
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

  const onDownloadRawMom = () => {
    window.open(rawMomDocument?.fileUrl, '_blank');
  };

  useEffect(() => {
    if (open) {
      if (defaultValues) {
        // reset(defaultValues);
        reset({
          customerSign: detailData?.validationSignature?.length
            ? defaultValues
            : [defaultValues],
        });
      } else {
        reset();
      }
      setMomDocument(null);
      setStep(1);
    }
  }, [open]);

  const {
    fields: customerFields,
    append,
    remove,
  } = useFieldArray({
    control,
    // shouldUnregister: true,
    name: 'customerSign',
  });

  const onAddCustomer = () => {
    append({
      customerName: '',
      customerPosition: '',
      email: '',
      phoneNumber: '+62',
    });
  };

  const onDeleteCustomer = (index) => () => {
    remove(index);
  };

  return {
    closeAllPopUp,
    control,
    generateLoading,
    handleSubmit,
    momDocument,
    onCancel,
    onDownloadRawMom,
    onPrevious,
    onSendDocument,
    onSubmitValidation,
    open,
    setMomDocument,
    setStep,
    settlementId,
    step,
    fetchSubmitDocument,
    customerFields,
    onAddCustomer,
    onDeleteCustomer,
  };
};

export default useAction;
