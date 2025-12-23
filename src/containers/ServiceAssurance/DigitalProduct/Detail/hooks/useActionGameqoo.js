import { useState } from 'react';

const useActionGameqoo = () => {
  const [modalReturn, setModalReturn] = useState(null);
  const [modalApproveIssue, setModalApproveIssue] = useState(null);
  const [modalChooseCategory, setModalChooseCategory] = useState(null);

  const onClickModalReturn = () => {
    setModalReturn({
      title: 'Please give a reason of reject',
      textInfo: 'Once you give a reason, it will be readed by customer',
      submitText: 'OKAY',
      withUpload: true,
      updateTo: 'Rejected',
      success: 'GameQoo ticket successfully rejected',
      confirmation: 'Are you sure want to reject this gameqoo ticket?',
    });
  };

  const onClickValidation = () => {
    setModalApproveIssue({
      title: 'Choose issue below',
      submitText: 'GO AHEAD',
    });
  };

  return {
    modalApproveIssue,
    modalChooseCategory,
    modalReturn,
    onClickModalReturn,
    onClickValidation,
    setModalApproveIssue,
    setModalChooseCategory,
    setModalReturn,
  };
};

export default useActionGameqoo;
