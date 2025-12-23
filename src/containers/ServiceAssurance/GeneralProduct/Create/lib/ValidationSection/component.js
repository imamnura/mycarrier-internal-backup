import React from 'react';
import { useWatch } from 'react-hook-form';
import { Grid, Box, FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import {
  TextField,
  Select,
  AutoComplete,
  PhoneInput,
} from '@components/FormField';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import useStyles from './styles';
import SelectWithLevel from '../SelectWithLevel';
import Card from '@components/Card';

export default function Component(props) {
  const {
    breadcrumb,
    submitValidation,
    useform: { control, handleSubmit, formState },
    checking,
    handleCheck,
    dropdown,
    loading,
    customerAsyncProps,
    handleDummySid,
    handleChangeSymptomp,
  } = props;

  const classes = useStyles();

  const watchCustomer = useWatch({ control, name: 'customer' });
  const watchProduct = useWatch({ control, name: 'product' });

  const dropFirstCall = [
    {
      label: 'No',
      value: 'no',
    },
  ];

  return (
    <form onSubmit={handleSubmit(submitValidation)} style={{ width: '100%' }}>
      <HeaderAndFilter breadcrumb={breadcrumb} />

      <Grid container style={{ padding: '24px 40px' }}>
        <Grid item md={6} sm={12} style={{ paddingRight: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card title="Service Information">
                <Box mb={5}>
                  <Box mt={3}>
                    <Select
                      asyncProps={customerAsyncProps}
                      control={control}
                      isSearchable
                      label="Choose Company"
                      menuWidth="100%"
                      minWidth="100%"
                      name="customer"
                      placeholder="Choose Company"
                      rawValue
                      required
                    />
                  </Box>
                  <Box mt={3}>
                    {
                      <Select
                        control={control}
                        isDisabled={!watchCustomer}
                        isLoading={loading.loadingProduct}
                        label="Product"
                        name="productId"
                        options={dropdown.product}
                        placeholder="Choose Product"
                        required
                      />
                    }
                  </Box>
                  <Box className={classes.boxContainer} mt={3}>
                    <Grid className={classes.inputField}>
                      <AutoComplete
                        control={control}
                        disabled={!watchProduct}
                        label="Service ID"
                        loading={loading.loadingDummySid}
                        maxLength={40}
                        name="serviceId"
                        options={dropdown.dummySid.map((v) => v.label)}
                        required
                      />
                    </Grid>
                    <Grid className={classes.buttonBox}>
                      <Button
                        children="DUMMY SID"
                        disabled={!watchProduct}
                        onClick={handleDummySid}
                      />
                    </Grid>
                  </Box>
                  <Box mt={3}>
                    <TextField
                      control={control}
                      disabled={!watchProduct}
                      label="Address"
                      maxLength={160}
                      minRows={5}
                      multiline
                      name="address"
                      required
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      control={control}
                      isDisabled={!watchProduct}
                      isLoading={loading.loadingFirstCall}
                      label="First Call Resolution"
                      maxWidth={260}
                      name="firstCallResolution"
                      options={dropFirstCall}
                      placeholder="Choose First Call Resolution"
                      required
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card title="PIC Customer">
                <Box mb={5}>
                  <Box mt={3}>
                    <TextField
                      control={control}
                      disabled={!watchProduct}
                      label="PIC Name"
                      maxLength={40}
                      name="picName"
                      required
                    />
                  </Box>
                  <Box mt={3}>
                    <PhoneInput
                      control={control}
                      disabled={!watchProduct}
                      label="PIC Contact"
                      maxLength={16}
                      name="picPhone"
                      required
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={6} sm={12} style={{ paddingLeft: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card title="Fault Information">
                <Box mb={5}>
                  <Box mt={3}>
                    <Select
                      control={control}
                      isDisabled={!watchProduct}
                      isLoading={loading.loadingChannel}
                      label="Source Channel"
                      maxWidth={175}
                      name="sourceChannel"
                      options={dropdown.channel}
                      placeholder="Choose Channel"
                      required
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      control={control}
                      isDisabled={!watchProduct}
                      isLoading={loading.loadingUrgency}
                      label="Urgency"
                      maxWidth={175}
                      name="urgency"
                      options={dropdown.urgency}
                      placeholder="Choose Urgency"
                      required
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      control={control}
                      isDisabled={!watchProduct}
                      isLoading={loading.loadingComplaint}
                      label="Hard Complaint"
                      maxWidth={230}
                      name="hardComplaint"
                      options={dropdown.complaint}
                      placeholder="Choose Hard Complaint"
                      required
                    />
                  </Box>
                  <Box mt={3}>
                    <SelectWithLevel
                      data={dropdown.symptoms}
                      isDisabled={!watchProduct}
                      isLoading={loading.loadingSymptoms}
                      label="Symptoms"
                      name="symptoms"
                      onChange={(v) => handleChangeSymptomp(v)}
                      placeholder="Choose Symptom"
                      required
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      control={control}
                      disabled={!watchProduct}
                      label="Description"
                      minRows={5}
                      multiline
                      name="description"
                      required
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      control={control}
                      disabled={!watchProduct}
                      label="OCC's Note"
                      maxLength={160}
                      minRows={5}
                      multiline
                      name="occNote"
                      required
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card title="PIC Internal">
                <Box mb={5}>
                  <Box mt={3}>
                    <TextField
                      control={control}
                      disabled={!watchProduct}
                      label="PIC Name"
                      maxLength={40}
                      name="contactName"
                      required
                    />
                  </Box>
                  <Box mt={3}>
                    <PhoneInput
                      control={control}
                      disabled={!watchProduct}
                      label="PIC Contact"
                      maxLength={16}
                      name="contactPhone"
                      required
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ paddingTop: 24 }}>
          <Card>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 10px',
              }}
            >
              <FormControlLabel
                control={<Checkbox checked={checking} onChange={handleCheck} />}
                label="&nbsp;&nbsp;Agree, Data cannot be changed after submitting"
              />
              <Button
                children="Submit Ticket"
                disabled={!formState.isValid || !formState.isDirty || !checking}
                type="submit"
              />
            </div>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}

Component.defaultProps = {
  actionButton: null,
  children: '',
  classes: {},
  detail: {},
  loading: {},
  title: '',
  useform: {},
};

Component.propTypes = {
  actionButton: PropTypes.node,
  breadcrumb: PropTypes.array.isRequired,
  checking: PropTypes.bool.isRequired,
  children: PropTypes.string,
  classes: PropTypes.object,
  customerAsyncProps: PropTypes.func.isRequired,
  detail: PropTypes.object,
  dropdown: PropTypes.object.isRequired,
  dummy: PropTypes.bool.isRequired,
  handleChangeSymptomp: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDummySid: PropTypes.func.isRequired,
  loading: PropTypes.object,
  submitValidation: PropTypes.func.isRequired,
  title: PropTypes.string,
  useform: PropTypes.object,
};
