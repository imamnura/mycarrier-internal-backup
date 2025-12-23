import { getPeriodUpdated } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = ({ open, onClose }) => {
  const router = useRouter();

  const bpNumber = router.query.id;

  const { control, handleSubmit } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setSuccessAlert, setLoadingAlert, setFailedAlert } = usePopupAlert();

  const fetchUpdatePeriod =
    ({ period, update }) =>
    async () => {
      setLoadingAlert();
      closeConfirmation();

      const params = {
        bpNumber: bpNumber,
        periode: moment(period).format('YYYYMM'),

        // TEMPORARY
        invoiceDate: moment(period).format('YYYYMM'),
      };

      if (update === 'invoiceDate') {
        params.invoiceDate = moment(period).format('YYYYMM');
      } else if (update === 'clearingDate') {
        params.clearingDate = moment(period).format('YYYYMM');
      }

      try {
        await getPeriodUpdated({ params });
        await onClose();
        await setSuccessAlert({
          message: 'Invoice is being fetched. It might take a while to update',
        });
      } catch (error) {
        setFailedAlert({ message: error.message });
      }
    };

  const onSubmit = async (value) => {
    setConfirmation({
      message: 'Are you sure want to update the data with this period?',
      action: [
        {
          children: 'no',
          onClick: closeConfirmation,
          variant: 'ghost',
        },
        {
          children: 'yes',
          onClick: fetchUpdatePeriod(value),
        },
      ],
    });
  };

  return {
    control,
    fetchUpdatePeriod,
    handleSubmit,
    onClose,
    onSubmit,
    open,
  };
};

export default useAction;
