import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { Select } from '@components/FormField';
import useActions from './hooks/useActions';
import DateRangePicker from '@components/DateRangePicker';
import { Controller } from 'react-hook-form';

export default function Component(props) {
  const { open } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleDownload,
    handleSubmit,
    onClose,
    loading,
    options,
  } = useActions(props);

  return (
    <Dialog customWidth={500} onClose={onClose} open={open}>
      <form onSubmit={handleSubmit(handleDownload)}>
        <Grid container style={{ padding: '12px 24px' }}>
          <Grid align="center" item xs={12}>
            <Typography color="general-dark" variant="h5" weight="medium">
              Choose specific filtering to download data
            </Typography>
          </Grid>
          <Grid align="center" item xs={12}>
            <Typography color="general-mid" variant="caption" weight="normal">
              More specific filtering that you&rsquo;ve chosen will generate
              more specific data
            </Typography>
          </Grid>
          <Grid item style={{ paddingTop: '16px' }} xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Select
                  control={control}
                  defaultValue="updatedAt"
                  label="Date"
                  menuWidth="100%"
                  minWidth="100%"
                  name="date"
                  options={[
                    {
                      label: 'Last Update',
                      value: 'updatedAt',
                    },
                    {
                      label: 'Order Date',
                      value: 'createdAt',
                    },
                  ]}
                  placeholder="Choose Date"
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  control={control}
                  isLoading={loading.customer}
                  isSearchable
                  label="Customer"
                  menuWidth="100%"
                  minWidth="100%"
                  name="customer"
                  options={options.customer}
                  placeholder="Choose Customer"
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field, fieldState }) => {
                    const { value = [null, null], onChange } = field;
                    const fieldProps = {
                      onChange,
                      value,
                      error: !!fieldState?.error?.message,
                      helperText: fieldState?.error?.message || '',
                    };

                    return (
                      <DateRangePicker
                        labelText="Date Range"
                        withIcon
                        {...fieldProps}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            pt={2}
            spacing={2}
            style={{ paddingTop: '20px' }}
          >
            <Grid item>
              <Button onClick={onClose} variant="ghost">
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={!isValid || !isDirty} type="submit">
                download
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  open: false,
};

Component.propTypes = {
  open: PropTypes.bool,
};
