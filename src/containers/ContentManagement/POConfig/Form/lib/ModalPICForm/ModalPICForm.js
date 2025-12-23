import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@__old/components/elements/Dialog';
import { TextField } from '@components/FormFieldLegion';
import { Text } from '@legion-ui/core';
import Button from '@components/Button';
import useAction from './hooks/useActions';
import useResponsive from '@utils/hooks/useResponsive';

const ModalPICForm = (props) => {
  const { open, onClose } = props;
  const mobileClient = useResponsive('xs');

  const {
    control,
    onSubmit,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useAction(props);

  return (
    <Dialog maxWidth="sm" onClose={onClose} open={open?.open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text children="Add New PIC Partner" weight="600" size="h6" />
        <div
          style={{
            display: 'flex',
            flexDirection: mobileClient ? 'column' : 'row',
            gap: '16px',
            marginTop: '24px',
            alignItems: 'start',
            width: '100%',
          }}
        >
          <TextField
            control={control}
            label="Full Name"
            block
            placeholder="Input Full Name"
            maxLength={40}
            name="name"
            required
          />
          <TextField
            control={control}
            label="Email"
            block
            placeholder="Input Email"
            maxLength={80}
            name="email"
            required
          />
          <TextField
            control={control}
            label="Phone Number"
            block
            placeholder="Input Phone Number"
            maxLength={14}
            name="phoneNumber"
            required
          />
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'flex-end',
            marginTop: '24px',
          }}
        >
          <Button children="Cancel" variant="ghost" onClick={onClose} />
          <Button
            children="Add PIC"
            disabled={!isValid || !isDirty}
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
};

ModalPICForm.defaultProps = {
  control: {},
  open: false,
  onClose: () => {},
};

ModalPICForm.propTypes = {
  control: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalPICForm;
