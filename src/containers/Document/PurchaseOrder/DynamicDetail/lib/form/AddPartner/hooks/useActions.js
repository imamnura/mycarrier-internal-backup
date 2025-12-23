import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const { data, setModalPartner, modalPartner, fetchUpdateStatus } = props;

  const [picModal, setPicModal] = useState({ open: false });
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const onSubmit = (value) => {
    setModalPartner({ ...modalPartner, open: false });

    const confirmation = {
      message: 'Are you sure want to approve this document?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus(
              {
                picPartner: value.picContact
                  .filter((item) => item.checked)
                  .map(
                    // eslint-disable-next-line no-unused-vars
                    ({ checked, emailHmac, phoneNumberHmac, ...rest }) => rest,
                  ),
                partnerName: data?.partnerName,
              },
              modalPartner,
            );
            closeConfirmation();
          },
        },
      ],
    };
    setConfirmation(confirmation);
  };

  const onClickDelete = (index) => () => {
    const confirmation = {
      message: 'Are you sure want to delete this PIC Contact?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            fieldsArray.remove(index);
            closeConfirmation();
          },
        },
      ],
    };
    setConfirmation(confirmation);
  };

  const onClose = () => setModalPartner(null);

  const onChangeChecked = (item, index) => () => {
    fieldsArray.update(index, {
      ...item,
      checked: !item.checked,
    });
  };

  const onClickEdit = (item, index) => () => {
    setPicModal({
      open: true,
      data: item,
      index: index,
      type: 'edit',
    });
    setModalPartner({ ...modalPartner, open: false });
  };

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      picContact: [{ fullName: '', phone: '', email: '', id: '' }],
    },
  });

  const fieldsArray = useFieldArray({
    control: form.control,
    name: 'picContact',
  });

  useEffect(() => {
    if (modalPartner?.initialOpen) {
      form.reset({
        picContact:
          data?.listPic?.map((v) => ({
            ...v,
            checked: true,
          })) || [],
      });
    }
  }, [modalPartner?.initialOpen]);

  return {
    onSubmit,
    onClickDelete,
    onClickEdit,
    onClose,
    onChangeChecked,
    fieldsArray,
    form,
    picModal,
    setPicModal,
  };
};

export default useActions;
