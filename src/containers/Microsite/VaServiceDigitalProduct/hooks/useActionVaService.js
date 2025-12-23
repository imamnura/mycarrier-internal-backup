import { useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { postUpdateStatusVaService } from '../_repositories/repositories';
import generateToken from '@utils/generateToken';

const useActionVaService = ({ data, fetchDetail }) => {
  const router = useRouter();
  const {
    query: { id: referenceId },
  } = router;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const [modalReturn, setModalReturn] = useState(null);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);

  const approveTicket = async () => {
    setConfirmation();
    setLoadingAlert();

    try {
      const accessTokenGenerate = await generateToken();
      const { success } = await postUpdateStatusVaService(
        {
          referenceId,
          status: data?.status,
        },
        accessTokenGenerate,
      );

      success &&
        setSuccessAlert({
          message: `Ticket successfully approved`,
          onClose: () => fetchDetail(),
        });
    } catch (err) {
      setFailedAlert({
        message: err?.message || `Ticket unsuccessfully approved`,
      });
    }
  };

  const onApprove = () => {
    setConfirmation({
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: approveTicket },
      ],
      message: `Are you sure want to approve this ticket?`,
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
      success: 'Ticket successfully rejected',
      confirmation: 'Are you sure want to reject this ticket?',
    });
  };

  const onClickModalUpdateStatus = () => {
    setModalUpdateStatus({
      title: 'Update Status',
      submitText: 'SUBMIT',
      withUpload: true,
      placeholder: 'Please describe customer requirements in more detail..',
    });
  };

  return {
    onApprove,
    modalReturn,
    onClickModalReturn,
    modalUpdateStatus,
    onClickModalUpdateStatus,
    setModalReturn,
    setModalUpdateStatus,
  };
};

export default useActionVaService;
