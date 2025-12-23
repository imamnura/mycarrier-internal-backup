import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@legion-ui/core';
import { TextField } from '@components/FormFieldLegion';
import Button from '@components/Button';
import useResponsive from '@utils/hooks/useResponsive';
import validation from './validation';
import useStyles from './styles';

const AddPic = ({ open, onClose, append, data, update, type, index }) => {
  const mobileClient = useResponsive('xs');
  const classes = useStyles(mobileClient);

  const { formState, control, reset, handleSubmit } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { isValid, isDirty } = formState;

  const onAdd = (value) => {
    append({ ...value, checked: true, id: '' });
    onClose();
  };

  const onEdit = (value) => {
    update(index, value);
    onClose();
  };

  const onSubmit = (value) => (type === 'edit' ? onEdit(value) : onAdd(value));

  useEffect(() => {
    reset(data);
    return () => {
      reset({});
    };
  }, [open]);

  return (
    <Modal
      show={open}
      title="Add PIC Partner"
      onClose={onClose}
      className={classes.modal}
      width={mobileClient ? '80%' : '700px'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.picWrapper}>
          <TextField
            block
            control={control}
            label="Name"
            placeholder="Input Full Name"
            name="name"
            required
          />
          <TextField
            block
            control={control}
            label="Phone Number"
            placeholder="Input Phone Number"
            name="phoneNumber"
            required
          />
          <TextField
            block
            control={control}
            label="Email"
            placeholder="Input Email"
            name="email"
            required
          />
        </div>
        <div className={classes.action}>
          <Button onClick={onClose} variant="ghost">
            CANCEL
          </Button>
          <Button disabled={!isValid || !isDirty} type="submit">
            SAVE
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPic;
