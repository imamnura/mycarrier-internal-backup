import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validationStep1 from '../elements/CompanyValidation/validation';
import validationStep2 from '../elements/ChooseOption/validation';
import validationStep3SalesTeam from '../elements/PickSalesTeam/validation';
import validationStep3OtherRecepient from '../elements/OtherRecepient/validation';
import { cleanObject } from '@utils/common';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { updateStatusLead } from '../../../../_repositories/repositories';
import { useDetailData } from '../../../utils';

const useAction = (props) => {
  const router = useRouter();
  const {
    query: { id: dashboardId },
  } = router;
  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { onClose, initialActiveStep, initialOtherCustomer } = props;

  const { fetchDetail, data } = useDetailData();

  const [activeStep, setActiveStep] = useState(initialActiveStep || 0);
  const pickValidation = () => {
    if (activeStep === 0) return validationStep1;
    if (activeStep === 1) return validationStep2;
    if (activeStep == '2SalesTeam') return validationStep3SalesTeam;
    if (activeStep == '2OtherRecepient') return validationStep3OtherRecepient;
  };

  const { control, handleSubmit, watch, setValue, formState } = useForm({
    resolver: pickValidation(),
    mode: 'onChange',
    defaultValues: { phoneNumber: '+62' },
  });
  const isOtherCustomer = initialOtherCustomer || watch('isOtherCustomer');
  const validBy = watch('validBy');

  useEffect(() => {
    if (activeStep === 0 && isOtherCustomer) setValue('companyName', null);
    if (activeStep === 0 && !isOtherCustomer) setValue('otherCompanyName', '');
  }, [isOtherCustomer, activeStep]);

  const maskingValidBy = {
    amMapping: 'selected Sales Team',
    sendEmail: 'Other Recepient',
    dispatchMyTens: 'MyTens',
  }[validBy];

  // const fetchAssign = async (value) => {
  const fetchAssign = (value) => async () => {
    setLoadingAlert();
    const {
      companyName,
      isOtherCustomer,
      otherCompanyName,
      validBy,
      amMapping,
      fullName,
      email,
      phoneNumber,
    } = value;

    const _payload = {
      // status: 'valid',
      company: isOtherCustomer
        ? {
            custAccntName: otherCompanyName,
            custAccntNum: '',
            preAccount: true,
          }
        : companyName?.data,
      validBy,
      amMapping: validBy === 'amMapping' ? amMapping : '',
      fullName: validBy === 'sendEmail' ? fullName : '',
      email: validBy === 'sendEmail' ? email : '',
      phoneNumber: validBy === 'sendEmail' ? phoneNumber : '',
    };

    const payload = cleanObject(_payload);

    try {
      const result = await updateStatusLead(dashboardId, 'valid', payload);
      if (result) {
        onClose();
        closeConfirmation();
        setSuccessAlert({
          message: `This lead was successfully assign to ${maskingValidBy}`,
        });
        fetchDetail();
      }
    } catch (error) {
      closeConfirmation();
      if (validBy === 'dispatchMyTens')
        setFailedAlert({
          message:
            error?.message ||
            `Something went wrong when assign to ${maskingValidBy}`,
        });
      else
        setFailedAlert({
          message: `Something went wrong when assign to ${maskingValidBy}`,
        });
    }
  };

  const onSubmit = (value) => {
    setConfirmation({
      message: `Are you sure want to assign this lead to ${maskingValidBy}?`,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchAssign(value) },
      ],
    });
  };

  return {
    activeStep,
    formProps: {
      ...props,
      setActiveStep,
      control,
      handleSubmit,
      onSubmit,
      isOtherCustomer,
      formState,
      data,
      fetchAssign,
    },
  };
};

export default useAction;
