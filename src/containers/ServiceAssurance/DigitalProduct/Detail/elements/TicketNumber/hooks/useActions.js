import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  searchTicketNumber,
  fetchApproveTicket,
} from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import { getSuccessMessageNeucloud } from '../../../utils';
import validation from '../validate';

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const useActions = (props) => {
  const { setModalTicketNumber, type } = props;

  const router = useRouter();
  const {
    query: { id: referenceId },
  } = router;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState, watch, getValues } = useForm({
    resolver: validation,
    mode: 'onChange',
    defaultValues: {
      ticketId: '',
    },
  });

  const [asyncValidating, setAsyncValidating] = useState(true);
  const [searchError, setSearcError] = useState('');

  const watchTicketId = watch('ticketId');

  useEffect(() => {
    if (watchTicketId.length > 0) {
      asyncValidate();
    }
  }, [watchTicketId]);

  const asyncValidate = async () => {
    setAsyncValidating(true);
    setSearcError('');

    const params = {
      search: getValues('ticketId'),
    };

    return await searchTicketNumber(params)
      .then(({ data, message }) => {
        if (data) {
          setSearcError('');
          setAsyncValidating(false);
        } else {
          setSearcError(message);
        }
      })
      .catch(({ message }) => {
        setSearcError(message);
      });
  };

  const handleAddTicketNumber = (values) => async () => {
    closeConfirmation();
    setLoadingAlert();

    const payload = {
      referenceId,
      ticketId: values.ticketId,
    };

    try {
      await fetchApproveTicket(payload);

      setSuccessAlert({
        message: getSuccessMessageNeucloud(type),
        onClose: () => router.reload(),
      });
    } catch (err) {
      setFailedAlert({
        message: err.message,
      });
    }
  };

  const onClose = () => {
    setModalTicketNumber(false);
    closeConfirmation();
  };

  const confirmation = (values) => {
    const confirmation = {
      message: `Are you sure want to ${type} ticket number?`,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: handleAddTicketNumber(values) },
      ],
    };

    setConfirmation(confirmation);
    setModalTicketNumber(false);
  };

  return {
    control,
    formState,
    handleSubmit,
    onClose,
    searchError,
    asyncValidating,
    confirmation,
    handleAddTicketNumber, //for testing
  };
};

export default useActions;
