import { deletePicProfile } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useAction = ({ type, updatePicProfile }) => {
  const typeLabel = {
    cdm: 'CDM',
    customer: 'customer',
  }[type];

  const [formPic, _setFormPic] = useState({
    open: false,
    variant: 'add',
    defaultValues: null,
  });

  const setFormPic =
    (val = { variant: '', defaultValues: null }) =>
    () => {
      _setFormPic({ ...val, open: true });
    };

  const closeFormPic = () => {
    _setFormPic({
      ...formPic,
      open: false,
    });
  };

  const {
    query: { id: bpNumber },
  } = useRouter();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const fetchDeleteProfile = (email) => async () => {
    setLoadingAlert();
    closeConfirmation();

    const payload = {
      email,
      bpNumber,
      type,
    };

    const key = {
      cdm: 'cdmPic',
      customer: 'pic',
    }[type];

    try {
      const result = await deletePicProfile(payload);
      updatePicProfile(type, result.data[key]);
      setSuccessAlert({
        message: `PIC profile ${typeLabel} successfully deleted`,
      });
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const deleteProfile = (email) => () => {
    setConfirmation({
      message: `Are you sure want to delete this PIC profile ${typeLabel}?`,
      action: [
        { children: 'NO', variant: 'ghost', onClick: closeConfirmation },
        { children: 'YES', onClick: fetchDeleteProfile(email) },
      ],
    });
  };

  return {
    formPic,
    setFormPic,
    closeFormPic,
    deleteProfile,
    fetchDeleteProfile,
  };
};

export default useAction;
