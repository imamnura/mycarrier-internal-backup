import {
  updateStatusLead,
  updateToOrder,
} from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { currencyToNumber } from '@utils/parser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDetailData } from '../../../utils';
import validation from '../validation';

const useAction = ({ show, onClose }) => {
  const router = useRouter();
  const {
    query: { id: dashboardId },
  } = router;

  const { data, fetchDetail } = useDetailData();
  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: validation,
    mode: 'onChange',
    // defaultValues: {
    //   product: data?.productDetail?.productName
    // }
  });

  const { setLoadingAlert, setFailedAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [step, setStep] = useState(1);
  const [agreementDoc, setAgreementDoc] = useState(null);

  const onNext = () => setStep(2);
  const onPrevious = () => setStep(1);

  const fetchSubmit = (value) => async () => {
    setLoadingAlert();
    closeConfirmation();
    const data = new FormData();
    data.append('file', agreementDoc?.file);
    data.append('revenue', currencyToNumber(value?.revenue, 'string'));
    data.append('subscriptionPeriod', value?.subscriptionPeriod);
    data.append('interestId', dashboardId);

    try {
      const res = await updateToOrder(data);
      if (res) {
        await updateStatusLead(dashboardId, 'order');
        await fetchDetail();
        onClose();
        setSuccessAlert({ message: `Lead was successfully set to Order` });
      }
    } catch (error) {
      setFailedAlert({ message: error?.message });
      // setFailedAlert({ message: 'Something went wrong when update to Order'  });
    }
  };

  const onSubmit = (value) => {
    setConfirmation({
      message: `Are you sure want to set this lead to Order?`,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchSubmit(value) },
      ],
    });
  };

  useEffect(() => {
    if (show) {
      reset();
      setAgreementDoc(null);
      setValue('product', data?.productDetail?.productName);
    }
    setStep(1);
  }, [show]);

  return {
    show,
    step,
    control,
    handleSubmit,
    onClose,
    onPrevious,
    onNext,
    onSubmit,
    agreementDoc,
    setAgreementDoc,
    fetchSubmit,
  };
};

export default useAction;
