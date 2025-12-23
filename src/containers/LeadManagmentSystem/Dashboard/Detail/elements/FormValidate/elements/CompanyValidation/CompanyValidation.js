import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import Checkbox from '@components/Checkbox';
import Stepper from '@components/Stepper';
import { Select, TextField } from '@components/FormField';
import { Controller } from 'react-hook-form';
import useAction from './hooks/useAction';
import Button from '@components/Button';
import { useDetailData } from '../../../../utils';

const CompanyValidation = (props) => {
  const { onClose } = props;

  const { data } = useDetailData();

  const {
    control,
    isOtherCustomer,
    onSubmit,
    handleSubmit,
    customerAsyncProps,
  } = useAction(props);

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Typography color="general-dark" inline variant="h5" weight="medium">
          Please assign this lead
        </Typography>
        <Typography color="general-mid" variant="caption">
          {' '}
          First, please make a validation of company{' '}
        </Typography>
      </Box>
      <Box my={3}>
        <Stepper
          active={0}
          steps={['Company Validation', 'Choose Option', 'Fill Option Data']}
          variant="number"
        />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Select
            asyncProps={customerAsyncProps}
            control={control}
            isDisabled={isOtherCustomer}
            isSearchable
            label="Company Name"
            maxWidth="100%"
            menuWidth={360}
            name="companyName"
            placeholder={data?.companyDetail?.companyName}
            rawValue
            required
            staticWidth="100%"
          />
          <Controller
            control={control}
            name="isOtherCustomer"
            render={({ field: { value, ...rest } }) => (
              <Box sx={{ display: 'flex', gap: 16 }}>
                <Checkbox {...rest} checked={value || false} />
                <Typography color="general-mid" variant="body2">
                  Customer not on the list above?
                </Typography>
              </Box>
            )}
          />
          {isOtherCustomer && (
            <TextField
              control={control}
              label="Company Name"
              maxLength={50}
              name="otherCompanyName"
              required
              // shouldUnregister
            />
          )}
        </Box>
      </Box>
      <Grid
        component={Box}
        container
        justifyContent="center"
        spacing={2}
        sx={{ width: '100%', padding: 16, pt: 4 }}
      >
        <Grid item>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit(onSubmit)}> Next </Button>
        </Grid>
      </Grid>
    </>
  );
};

CompanyValidation.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CompanyValidation;
