import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@__old/components/elements/Dialog';
import { Box, Text, Switch } from '@legion-ui/core';
import DynamicForm from '../DynamicForm';
import { Controller } from 'react-hook-form';
import Button from '@components/Button';

const ModalRootProducuct = (props) => {
  const {
    open,
    onClose,
    productFlow,
    onSubmit,
    handleSubmit,
    formState: { isValid, isDirty },
    formRootProduct,
  } = props;

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open?.open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text children="Add Root Product" weight="600" size="h6" />
        <Box pt="16px">
          <DynamicForm
            {...props}
            additionalForm={productFlow?.data?.baseForm}
            useForm={formRootProduct}
            filters={{
              formtype: [
                'Text Field',
                'Text Area',
                'Dropdown',
                'Upload File',
                'PIC Partner',
              ],
            }}
          />
        </Box>
        <Box pt="16px">
          <Controller
            control={formRootProduct.control}
            name="isAttributeAttached"
            render={({ field }) => {
              const { value, onChange } = field;
              const fieldProps = {
                onChange,
                value: value,
                checked: value,
              };
              return (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Switch {...fieldProps} />
                  <Text size="14px" weight="400" color="#2F424A">
                    Attribute attached to root product
                  </Text>
                </div>
              );
            }}
          />
        </Box>
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
            children="Add"
            disabled={!isValid || !isDirty}
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
};

ModalRootProducuct.defaultProps = {
  control: {},
  open: false,
  onClose: () => {},
};

ModalRootProducuct.propTypes = {
  control: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalRootProducuct;
