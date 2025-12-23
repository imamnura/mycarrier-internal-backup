import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@components/FormFieldLegion';
import { Text } from '@legion-ui/core';
import { Grid } from '@material-ui/core';
import { Select } from '@components/FormField';
import useActions from './hooks/useActions';
import { object, string } from 'yup';
import { phoneRegex } from '@utils/common';

const CustomerInfo = (props) => {
  const { useForm } = props;

  const { customersAsyncProps, picCustomersAsyncProps, watchCustomer } =
    useActions(props);

  return (
    <Grid container md={6} xs={12} spacing={2}>
      <Grid item xs={12}>
        <Text size="14px" weight="600" block mb="8px" color="secondary600">
          <Text children="*" size="14px" color="primary500" />
          Company Name
        </Text>
        <Select
          asyncProps={customersAsyncProps}
          cacheOptions
          control={useForm?.control}
          customOnChange={() => {
            useForm?.setValue('selectedPIC', undefined);
            useForm?.setValue('pic', {
              email: '',
              phoneNumber: '',
            });
            useForm?.trigger('pic');
            useForm?.trigger('selectedPIC');
          }}
          defaultOptions
          isSearchable
          menuWidth="100%"
          minWidth="100%"
          name="customer"
          noBorder={false}
          placeholder="Choose Company Name"
          rawValue
          hideNullHelperText
          rules={{
            validate: async (value) =>
              object()
                .required()
                .label('Company Name')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Text size="14px" weight="600" block mb="8px" color="secondary600">
          <Text children="*" size="14px" color="primary500" />
          PIC Name
        </Text>
        <Select
          asyncProps={picCustomersAsyncProps}
          cacheOptions
          control={useForm?.control}
          creatableWording="Add PIC Name"
          customOnChange={(v) => {
            useForm?.setValue('pic', {
              email: v?.data?.email || '',
              phoneNumber: v?.data?.phoneNumber || '',
            });
            useForm?.trigger('pic');
          }}
          defaultOptions
          onCreate={(v) => {
            useForm?.setValue('selectedPIC', v);
          }}
          isCreatable
          isDisabled={!watchCustomer?.data?.custAccntNum}
          isSearchable
          menuWidth="100%"
          minWidth="100%"
          name="selectedPIC"
          noBorder={false}
          placeholder="Input PIC Name"
          rawValue
          hideNullHelperText
          rules={{
            validate: async (value) =>
              object()
                .required()
                .label('PIC Name')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          block
          control={useForm?.control}
          label="Email"
          name="pic.email"
          placeholder="Input Email"
          required
          rules={{
            validate: async (value) =>
              string()
                .required()
                .email()
                .label('PIC Email')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          block
          control={useForm?.control}
          label="Phone Number"
          name="pic.phoneNumber"
          placeholder="Input Phone number"
          required
          rules={{
            validate: async (value) =>
              string()
                .matches(
                  phoneRegex,
                  'Phone Number must use the correct format (+62xxx)',
                )
                .required()
                .min(12)
                .label('PIC Phone Number')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
      </Grid>
    </Grid>
  );
};

CustomerInfo.propTypes = {
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  trigger: PropTypes.func.isRequired,
};

export default CustomerInfo;
