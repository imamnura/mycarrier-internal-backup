import { updateStatusSettlementList } from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = ({ open, onClose, setDetailData }) => {
  const router = useRouter();

  const settlementId = router.query.id;

  const { control, handleSubmit } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setSuccessAlert, setLoadingAlert, setFailedAlert } = usePopupAlert();

  const fetchComplete = (data) => async () => {
    setLoadingAlert();
    closeConfirmation();

    const payload = {
      status: 'completed',
      data,
    };

    try {
      const result = await updateStatusSettlementList(settlementId, payload);
      if (result.data) {
        setDetailData(result.data);
        onClose();
        setSuccessAlert({ message: 'Settlement successfully completed' });
      }
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onSubmit = (value) => {
    setConfirmation({
      message:
        'Are you sure want to complete this settlement by issuing invoice?',
      action: [
        {
          children: 'no',
          onClick: closeConfirmation,
          variant: 'ghost',
        },
        {
          children: 'yes',
          onClick: fetchComplete(value),
        },
      ],
    });
  };

  return {
    control,
    fetchComplete,
    handleSubmit,
    onClose,
    onSubmit,
    open,
  };
};

export default useAction;
