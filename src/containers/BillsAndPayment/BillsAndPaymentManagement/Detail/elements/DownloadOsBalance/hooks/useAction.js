import { getOsBalance } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import validation from '../validation';
import { cleanObject } from '@utils/common';

const useAction = ({ open, onClose, testLocator }) => {
  const router = useRouter();

  const bpNumber = router.query.id;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setSuccessAlert, setLoadingAlert, setFailedAlert } = usePopupAlert();

  const fetchDownloadOsBalance =
    ({ period }) =>
    async () => {
      setLoadingAlert();
      closeConfirmation();
      onClose();

      const _params = {
        bpNumber,
        startPeriode: period[0] ? moment(period[0]).format('YYYYMM') : null,
        endPeriode: period[1] ? moment(period[1]).format('YYYYMM') : null,
      };

      const params = cleanObject(_params);

      try {
        const { success, message } = await getOsBalance({
          params,
          withCancel: true,
        });
        if (success) {
          setSuccessAlert({
            message: message || 'Data O/S Balance successfully send to email',
          });
        }
      } catch (error) {
        setFailedAlert({ message: error?.message });
      }
    };

  const onSubmit = async (value) => {
    setConfirmation({
      message: 'Are you sure want to download the data with this period?',
      action: [
        {
          children: 'no',
          onClick: closeConfirmation,
          variant: 'ghost',
          id: testLocator.confirmation.no,
        },
        {
          children: 'yes',
          onClick: fetchDownloadOsBalance(value),
          id: testLocator.confirmation.yes,
        },
      ],
    });
  };

  return {
    control,
    onClose,
    onSubmit,
    open,
    handleSubmit,
    fetchDownloadOsBalance,
    isValid,
  };
};

export default useAction;
