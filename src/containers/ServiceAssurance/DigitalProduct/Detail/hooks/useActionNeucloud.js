import { useState } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActionNeucloud = ({ data }) => {
  const { closeConfirmation } = usePopupConfirmation();
  const [modalReturn, setModalReturn] = useState(null);
  const [modalPriority, setModalPriorityForm] = useState(null);

  const [openFormUpdateStatus, setOpenFormUpdateStatus] = useState({
    open: false,
    status: '',
  });
  const [openFormTicketNumber, setOpenFormTicketNumber] = useState({
    open: false,
    type: 'Add',
  });
  const [openFormProgress, setOpenFormProgress] = useState({
    open: false,
    status: '',
  });
  const [modalMessage, setModalMessage] = useState(false);

  const handleFormTicketNumber =
    (type = 'Add') =>
    () => {
      if (!openFormTicketNumber.open) {
        closeConfirmation();
      }
      setOpenFormTicketNumber({
        open: !openFormTicketNumber.open,
        type: type,
        initialValues: type === 'Edit' && data,
      });
    };

  const handleFormUpdateStatus = (status = '') => {
    if (!openFormUpdateStatus.open) {
      closeConfirmation();
    }
    setOpenFormUpdateStatus({
      open: !openFormUpdateStatus.open,
      status: status,
    });
  };

  const handleFormProgress = () => {
    if (!openFormProgress.open) {
      closeConfirmation();
    }
    setOpenFormProgress({ open: !openFormProgress.open });
  };

  const onClickModalReturn = () => {
    setModalReturn({
      title: 'Please give note of reject',
      textInfo:
        'Once you rejected this, it will be process and data will be sent to customer automatically.',
      submitText: 'OKAY',
      withUpload: false,
      updateTo: 'Rejected',
      success: 'NewCloud ticket successfully rejected',
      confirmation: 'Are you sure want to reject this NeuCloud ticket?',
    });
  };

  const onClickApproval = () => {
    setModalPriorityForm({
      title: 'Please add priority level',
      button: 'NEXT',
      confirmation:
        'Are you sure want to escalated this NeuCloud ticket to Wowrack?',
      success: 'NeuCloud ticket successfully escalated to Wowrack & approved',
    });
  };

  return {
    openFormUpdateStatus,
    setOpenFormUpdateStatus,
    openFormTicketNumber,
    setOpenFormTicketNumber,
    openFormProgress,
    setOpenFormProgress,
    modalMessage,
    setModalMessage,
    handleFormTicketNumber,
    handleFormUpdateStatus,
    handleFormProgress,
    onClickModalReturn,
    setModalReturn,
    modalReturn,
    onClickApproval,
    modalPriority,
    setModalPriorityForm,
  };
};

export default useActionNeucloud;
