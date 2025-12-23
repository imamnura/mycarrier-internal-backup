import { useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { fetchApproveTicket } from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';

const useActionApilogy = () => {
  const router = useRouter();
  const {
    query: { id: referenceId },
  } = router;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const [modalReturn, setModalReturn] = useState(null);

  const approveTicket = async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      const { success } = await fetchApproveTicket({ referenceId });

      success &&
        setSuccessAlert({
          message: `Apilogy ticket successfully escalated to DOA & approved`,
          onClose: () => router.reload(),
        });
    } catch (err) {
      setFailedAlert({
        message:
          err?.message ||
          `Apilogy ticket unsuccessfully escalated to DOA & approved`,
      });
    }
  };

  const onApprove = () => {
    setConfirmation({
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: approveTicket },
      ],
      message: `Are you sure want to escalated this issue Apilogy ticket to DOA?`,
    });
  };

  const onClickModalReturn = () => {
    setModalReturn({
      title: 'Please give note of reject',
      submitText: 'SUBMIT',
      withUpload: false,
      placeholder: 'Please describe the reason..',
      maxLengthReason: 1000,
      caption:
        'Once you rejected this, it will be process and data will be sent to customer automatically.',
      success: 'Apilogy ticket successfully rejected',
      confirmation: 'Are you sure want to reject this Apilogy ticket?',
    });
  };

  return {
    onApprove,
    modalReturn,
    onClickModalReturn,
    setModalReturn,
    approveTicket, //for testing
  };
};

export default useActionApilogy;
