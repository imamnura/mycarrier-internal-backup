import {
  getOptionsCompanyName,
  postDraftOfferingLetter,
} from '@containers/Document/OfferingLetter/_repositories/repositories';
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
      companyName = '',
      companyAddress = '',
      companyPhoneNumber = '+62',
      contact = [{ phoneNumber: '+62' }],
    } = data || {};

    reset({
      companyName,
      companyAddress,
      companyPhoneNumber,
      contact,
    });
  };

  useEffect(() => {
    onDefaultDataChange();
  }, [data]);

  const [optionsCompanyName, setOptionsCompanyName] = useState([]);

  const fetchOptionsCompany = async () => {
    try {
      const result = await getOptionsCompanyName();
      const options = result.data.map(({ custAccntName }) => custAccntName);
      setOptionsCompanyName(options);
    } catch (error) {
      setOptionsCompanyName([]);
    }
  };

  useEffect(() => {
    fetchOptionsCompany();
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  const { setQueryParams, queryParams } = useQueryParams();
  const { closeConfirmation } = usePopupConfirmation();

  const offeringLetterId = queryParams.id;
  const amToolsId = queryParams.amtools;

  const [submitLoading, setSubmitLoading] = useState(null);

  const setTab = (tab) => {
    closeConfirmation();
    _setTab(tab);
  };

  // type: 'next' | 'draft' | 'previous
  const fetchDraftOfferingLetter = async (values, type, destinationStep) => {
    setSubmitLoading(type);
    const _payload = {
      data: {
        ...values,
        amToolsId,
      },
      step: 1,
    };

    const payload = cleanObject(_payload);

    try {
      const result = await postDraftOfferingLetter(offeringLetterId, payload);
      if (!offeringLetterId) {
        setQueryParams({ id: result.data.offeringLetterId });
      } else {
        updateData(result.data);
      }
      setTab(destinationStep);
      setSubmitLoading(false);
      enqueueSnackbar('Document saved as draft.');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      setSubmitLoading(false);
    }
  };

  const submitHandler = ({ destinationStep, type }) => {
    if (!formState.isDirty && formState.isValid) {
      return () => setTab(destinationStep);
    }

    return handleSubmit((val) =>
      fetchDraftOfferingLetter(val, type, destinationStep),
    );
  };

  const onSubmit = (type) => {
    const destinationStep = {
      next: 2,
      draft: 1,
    }[type];

    return submitHandler({ type, destinationStep });
  };

  const onStepperClick = (_destinationStep) => {
    const destinationStep = _destinationStep + 1;
    const type = 'next';
    submitHandler({ type, destinationStep })();
  };

  return {
    control,
    onStepperClick,
    onSubmit,
    optionsCompanyName,
    submitLoading,
  };
};

export default useAction;
