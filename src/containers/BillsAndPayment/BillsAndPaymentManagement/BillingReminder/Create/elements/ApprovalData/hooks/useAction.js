import { cleanObject } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useQueryParams from '@utils/hooks/useQueryParams';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import validation from '../validation';
import { useRouter } from 'next/router';
import { route } from '@configs/index';
import { postDraftBillingReminder } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useAction = (props) => {
  const { data, setTab, updateData, loading, onDiscard: _onDiscard } = props;

  const router = useRouter();
  const {
    query: { bpNumber, count },
  } = router;
  const { enqueueSnackbar } = useSnackbar();
  const { setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { queryParams } = useQueryParams();

  const reminderId = queryParams.id;

  const [submitLoading, setSubmitLoading] = useState(null);
  const [tempCC, setTempCC] = useState([]);
  const [popUpcc, setPopUpCC] = useState(false);
  const closePopUpCC = () => setPopUpCC(false);

  const { control, handleSubmit, reset, formState, watch, trigger } = useForm({
    resolver: validation,
    mode: 'onChange',
    defaultValues: {
      reviewer: [{ phoneNumber: '+62', isEdit: true }],
    },
  });

  const {
    fields: reviewerFields,
    insert,
    remove,
    move,
    update,
  } = useFieldArray({
    control,
    shouldUnregister: true,
    name: 'reviewer',
  });

  const onAddRecipient = () => {
    const indexAdd = reviewerFields.findIndex((v) => v.isEdit === false);
    insert(indexAdd, {
      name: '',
      email: '',
      position: '',
      phoneNumber: '+62',
      isEdit: true,
    });
  };

  const onDeleteReviewer = (index) => () => {
    remove(index);
  };

  const onAddCC = () => setPopUpCC(true);

  const onDeleteCC = (data) => () => {
    setTempCC(tempCC.filter((e) => e != data));
  };

  const onDefaultDataChange = () => {
    let dataReset = [];

    if (data?.reviewer?.length && !data?.reviewer[0].isEdit) {
      dataReset = [
        { phoneNumber: '+62', isEdit: true },
        ...data.reviewer.map(
          ({ name, email, position, phoneNumber, isEdit }) => ({
            name,
            email,
            position,
            phoneNumber,
            isEdit,
          }),
        ),
      ];
    } else if (data?.reviewer?.length) {
      dataReset = data.reviewer.map(
        ({ name, email, position, phoneNumber, isEdit }) => ({
          name,
          email,
          position,
          phoneNumber,
          isEdit,
        }),
      );
    } else {
      dataReset = [{ phoneNumber: '+62', isEdit: true }];
    }

    reset({
      reviewer: dataReset,
    });
    trigger(`reviewer`);
  };

  const onReorder = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sourceIndex = source.index;
    const destIndex = destination.index;
    move(sourceIndex, destIndex);
  };

  useEffect(() => {
    if (data?.carbonCopy) {
      setTempCC(data?.carbonCopy);
    } else {
      setTempCC([]);
    }
    onDefaultDataChange();
  }, [data]);

  const redirect = () => router.push(route.billsAndPayment('detail', bpNumber));

  // type: 'next' | 'draft' | 'previous
  const fetchDraft = (type, destinationStep) => async (values) => {
    closeConfirmation();
    setSubmitLoading(type);
    const _payload = {
      reminderId,
      bpNumber,
      step: '3',
      data: {
        ...values, // reviewer
        carbonCopy: tempCC,
      },
      status: type == 'next' ? 'send' : '',
    };

    const payload = cleanObject(_payload);

    try {
      const result = await postDraftBillingReminder(reminderId, payload);
      if (type == 'draft') {
        setTab(destinationStep);
        enqueueSnackbar('Document saved as draft.');
      } else {
        setSuccessAlert({
          message: 'Billing reminder successfully sended',
          onClose: redirect,
        });
      }
      updateData(result.data);
      setSubmitLoading(false);
      closeConfirmation();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      closeConfirmation();
      setSubmitLoading(false);
    }
  };

  const onDiscard = () => {
    setSubmitLoading(false);
    _onDiscard();
  };

  const setPrevious = (destinationStep) => () => {
    closeConfirmation();
    setTab(destinationStep);
  };

  const onPrevious = (destinationStep) => () =>
    setConfirmation({
      message: 'Are you sure that you want leave this form?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'yes',
          onClick: setPrevious(destinationStep),
        },
      ],
    });

  const onNext = (type, destinationStep) => () =>
    setConfirmation({
      message: 'Are you sure want to send this billing reminder?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'yes',
          onClick: handleSubmit(fetchDraft(type, destinationStep)),
        },
      ],
    });

  const submitHandler = ({ destinationStep, type }) => {
    if (type === 'cancel') {
      return redirect;
    } else if (type === 'discard') {
      return onDiscard;
    } else if (!formState.isDirty && type === 'previous') {
      return () => setTab(destinationStep);
    } else if (type === 'previous') {
      return onPrevious(destinationStep);
    } else if (type === 'next') {
      return onNext(type, destinationStep);
    }
    // return handleSubmit((val) => fetchDraft(val, type, destinationStep));
    return handleSubmit(fetchDraft(type, destinationStep));
  };

  const onSubmit = (type) => {
    const destinationStep = {
      draft: 3,
      previous: 2,
    }[type];

    return submitHandler({ type, destinationStep });
  };

  const onStepperClick = (_destinationStep) => {
    const destinationStep = _destinationStep + 1;
    const type = 'previous';
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
    reviewerFields,
    onAddRecipient,
    onDeleteReviewer,
    onReorder,
    control,
    onAddCC,
    onDeleteCC,
    tempCC,
    setTempCC,
    popUpcc,
    closePopUpCC,
    formState,
    redirect,
    onDiscard,
    onPrevious,
    setPrevious,
    onNext,
    fetchDraft,
    watch,
    update,
    trigger,
  };
};

export default useAction;
