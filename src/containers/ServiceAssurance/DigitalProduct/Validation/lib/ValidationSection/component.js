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
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import useStyles from './styles';
import SelectWithLevel from '../SelectWithLevel';
import Card from '@components/Card';

export default function ValidationSection(props) {
  const {
    breadcrumb,
    checking,
    detail,
    dropdown,
    dummy,
    handleCheck,
    handleDummySid,
    loading,
    submitValidation,
    useform: { control, formState, handleSubmit, setValue },
  } = props;

  const classes = useStyles();

  const dropFirstCall = [
    {
      label: 'No',
      value: 'no',
    },
  ];

  const handleChangeSymptomp = (v) => {
    setValue('symptompName', v.symptompName);
    setValue('symptoms', v.symptompId);
    setValue('symptompDesc', v.symptompDesc);
    setValue('symptompPath', v.symptompPath);
  };

  return (
    <form onSubmit={handleSubmit(submitValidation)}>
      <HeaderAndFilter breadcrumb={breadcrumb} />

      <Grid container style={{ padding: '24px 40px' }}>
        <Grid item md={6} sm={12} style={{ paddingRight: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card title="Servioce Information">
                <Box>
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
                    <Select
                      control={control}
                      isLoading={loading.loadingProduct}
                      label="Product"
                      name="productId"
                      options={dropdown.product}
                      placeholder="Choose Product"
                      required
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card title="PIC Customer">
                <Box>
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
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={6} sm={12} style={{ paddingLeft: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card title="Fault Information">
                <Box>
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
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card title="PIC Internal">
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
                children="Validate"
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
