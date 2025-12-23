import React from 'react';
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
import Typography from '@components/Typography';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import useStyles from './styles';
import SelectWithLevel from '../SelectWithLevel';

export default function ValidationSection(props) {
  const {
    breadcrumb,
    submitValidation,
    useform: { control, handleSubmit, formState, setValue },
    checking,
    handleCheck,
    dropdown,
    loading,
    detail,
    handleDummySid,
    dummy,
  } = props;

  const classes = useStyles();

  const dropFirstCall = [
    {
      label: 'No',
      value: 'no',
    },
  ];

  const titleProps = {
    color: 'general-mid',
    variant: 'h4',
    weight: 'medium',
  };

  const handleChangeSymptomp = (v) => {
    setValue('symptompName', v.symptompName);
    setValue('symptoms', v.symptompId);
    setValue('symptompDesc', v.symptompDesc);
    setValue('symptompPath', v.symptompPath);
  };

  const TopPage = (
    <>
      <Grid item md={12} sm={12}>
        <HeaderAndFilter breadcrumb={breadcrumb} />
      </Grid>
    </>
  );

  return (
    <form onSubmit={handleSubmit(submitValidation)}>
      <Grid container spacing={5}>
        {TopPage}
        <Grid item md={6} sm={12}>
          <Typography children="Service Information" {...titleProps} />
          <Box mb={5}>
            <Box className={classes.boxContainer} mt={3}>
              <Grid className={classes.inputField}>
                {!dummy ? (
                  <TextField
                    control={control}
                    disabled={detail.manualSid ? false : true}
                    label="Service ID"
                    maxLength={40}
                    name="serviceId"
                    required
                  />
                ) : (
                  <AutoComplete
                    control={control}
                    label="Service ID"
                    loading={loading.loadingDummySid}
                    maxLength={160}
                    name="serviceId"
                    options={dropdown.dummySid.map((v) => v.label)}
                    required
                  />
                )}
              </Grid>
              <Grid className={classes.buttonBox}>
                <Button
                  children="DUMMY SID"
                  disabled={detail.manualSid ? dummy : true}
                  onClick={handleDummySid}
                />
              </Grid>
            </Box>
            <Box mt={3}>
              <TextField
                control={control}
                disabled={detail.manualSid && dummy ? false : true}
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
                isLoading={loading.loadingFirstCall}
                label="First Call Resolution"
                maxWidth={260}
                name="firstCallResolution"
                options={dropFirstCall}
                placeholder="Choose First Call Resolution"
                required
              />
            </Box>
            <Box mt={3}>
              {
                <Select
                  control={control}
                  isLoading={loading.loadingProduct}
                  label="Product"
                  name="productId"
                  options={dropdown.product}
                  placeholder="Choose Product"
                  required
                />
              }
            </Box>
          </Box>
          <Typography children="PIC Customer" {...titleProps} />
          <Box mb={5}>
            <Box mt={3}>
              <TextField
                control={control}
                disabled={detail.picName === '' ? false : true}
                label="PIC Name"
                maxLength={40}
                name="picName"
                required
              />
            </Box>
            <Box mt={3}>
              <PhoneInput
                control={control}
                disabled={detail.picContact === '' ? false : true}
                label="PIC Contact"
                maxLength={16}
                name="picPhoneNumber"
                required
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} sm={12}>
          <Typography children="Fault Information" {...titleProps} />
          <Box mb={5}>
            <Box mt={3}>
              <Select
                control={control}
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
                disabled={
                  !detail.description || detail.description === ''
                    ? false
                    : true
                }
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
                label="OCC's Note"
                maxLength={160}
                minRows={5}
                multiline
                name="occNote"
                required
              />
            </Box>
          </Box>
          <Typography children="PIC Internal" {...titleProps} />
          <Box mb={5}>
            <Box mt={3}>
              <TextField
                control={control}
                label="PIC Name"
                maxLength={40}
                name="contactName"
                // required
              />
            </Box>
            <Box mt={3}>
              <PhoneInput
                control={control}
                label="PIC Contact"
                maxLength={16}
                name="contactPhone"
                // required
              />
            </Box>
          </Box>
        </Grid>
        <Grid className={classes.checkboxBox}>
          <FormControlLabel
            control={<Checkbox checked={checking} onChange={handleCheck} />}
            label="&nbsp;&nbsp;Agree, Data cannot be changed after submitting"
          />
        </Grid>
        <Grid className={classes.buttonValidate}>
          <Button
            children="Validate"
            disabled={!formState.isValid || !formState.isDirty || !checking}
            type="submit"
          />
        </Grid>
      </Grid>
    </form>
  );
}

ValidationSection.defaultProps = {
  actionButton: null,
  children: '',
  classes: {},
  detail: {},
  loading: {},
  status: {},
  title: '',
  useform: {},
};

ValidationSection.propTypes = {
  actionButton: PropTypes.node,
  breadcrumb: PropTypes.array.isRequired,
  checking: PropTypes.bool.isRequired,
  children: PropTypes.string,
  classes: PropTypes.object,
  detail: PropTypes.object,
  dropdown: PropTypes.object.isRequired,
  dummy: PropTypes.bool.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDummySid: PropTypes.func.isRequired,
  loading: PropTypes.object,
  status: PropTypes.object,
  submitValidation: PropTypes.func.isRequired,
  title: PropTypes.string,
  useform: PropTypes.object,
};
