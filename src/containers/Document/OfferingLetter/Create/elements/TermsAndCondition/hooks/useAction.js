import { postDraftOfferingLetter } from '@containers/Document/OfferingLetter/_repositories/repositories';
import { cleanObject } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useQueryParams from '@utils/hooks/useQueryParams';

import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = (props) => {
  const { data, setTab: _setTab, updateData } = props;
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      companyPhoneNumber: '+62',
      contact: [{ phoneNumber: '+62' }],
    },
    resolver: validation,
    mode: 'onChange',
  });

  const onDefaultDataChange = () => {
    const {
      usage = { unit: 'year' },
      appreciation,
      rfs,
      tnc_note,
    } = data?.toc || {};

    reset({
      toc: {
        appreciation,
        rfs,
        tnc_note,
        usage,
      },
    });
  };

  useEffect(() => {
    onDefaultDataChange();
  }, [data]);

  const { enqueueSnackbar } = useSnackbar();
  const { queryParams } = useQueryParams();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const offeringLetterId = queryParams.id;

  const [submitLoading, setSubmitLoading] = useState(null);

  const setTab = (tab) => {
    closeConfirmation();
    _setTab(tab);
  };

  // type: 'next' | 'draft' | 'previous'
  const fetchDraftOfferingLetter = async (values, type, destinationStep) => {
    setSubmitLoading(type);
    const _payload = {
      data: values,
      step: 3,
    };

    const payload = cleanObject(_payload);

    try {
      const result = await postDraftOfferingLetter(offeringLetterId, payload);
      updateData(result.data);
      setSubmitLoading(false);
      setTab(destinationStep);
      enqueueSnackbar('Document saved as draft.');
    } catch (error) {
      setSubmitLoading(false);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const submitHandler = ({ destinationStep, type }) => {
    if (!formState.isDirty && formState.isValid) {
      return () => setTab(destinationStep);
    } else if (!formState.isValid && type === 'previous') {
      return () =>
        setConfirmation({
          message: 'Are you sure that you want leave this form?',
          action: [
            { children: 'no', variant: 'ghost', onClick: closeConfirmation },
            { children: 'yes', onClick: () => setTab(destinationStep) },
          ],
        });
    }

    return handleSubmit((val) =>
      fetchDraftOfferingLetter(val, type, destinationStep),
    );
  };

  const onSubmit = (type) => {
    const destinationStep = {
      next: 4,
      previous: 2,
      draft: 3,
    }[type];

    return submitHandler({ type, destinationStep });
  };

  const onStepperClick = (_destinationStep) => {
    const destinationStep = _destinationStep + 1;
    const type = destinationStep > 3 ? 'next' : 'previous';
    submitHandler({ type, destinationStep })();
  };

  return {
    control,
    onSubmit,
    submitLoading,
    onStepperClick,
  };
};

export default useAction;
