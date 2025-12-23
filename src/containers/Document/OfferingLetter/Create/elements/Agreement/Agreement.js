import React, { Fragment } from 'react';
import Create from '@fragments/Create';
import { Box, Grid } from '@material-ui/core';
import useAction from './hooks/useAction';
import Typography from '@components/Typography';
import { TextField } from '@components/FormField';
import PropTypes from 'prop-types';
// import useStyles from './styles';
import { useFieldArray } from 'react-hook-form';
import StepperForm from '@containers/Document/OfferingLetter/_elements/StepperForm';
import { breadcrumb } from '../../utils';
import Otp from '../OTP';
import Card from '@components/Card';

const Agreement = (props) => {
  const { data } = props;
  const {
    otpProperty,
    control,
    loading,
    offeringLetterId,
    onStepperClick,
    onSubmit,
    // signatureType,
    submitLoading,
  } = useAction(props);

  // const classes = useStyles();

  const { fields } = useFieldArray({
    control,
    shouldUnregister: true,
    name: 'agreement',
  });

  // const onAddRecipient = () => {
  //   append({ name: '', email: '', position: '', phoneNumber: '+62' });
  // };

  // const onDeleteReviewer = (index) => () => {
  //   remove(index);
  // };

  return (
    <>
      <Create
        action={[
          {
            children: 'Save as Draft',
            onClick: onSubmit('draft'),
            variant: 'ghost',
            loading: submitLoading === 'draft',
          },
          {
            children: 'Previous Step',
            onClick: onSubmit('previous'),
            loading: submitLoading === 'previous',
          },
          {
            // hideDivider: true,
            children: 'review & submit',
            onClick: onSubmit('next'),
            ml: 16,
            loading: submitLoading === 'next',
          },
        ]}
        breadcrumb={breadcrumb}
        loading={loading}
        stepperTab={
          <StepperForm active={4} data={data} onStepperClick={onStepperClick} />
        }
      >
        {/* <Card title="Signature Type">
          <RadioGroup
            alignItems="flex-start"
            control={control}
            direction="horizontal"
            // disabled
            name="signatureType"
            options={[
              {
                label: (
                  <Box width={216}>
                    <Typography inline variant="subtitle1" weight="bold">
                      Approval by AM
                    </Typography>
                    <p className={classes.approvalTypeDesc}>
                      Account Manager will do approval & sign the document based
                      on digital signature
                    </p>
                  </Box>
                ),
                value: 'am_approval',
              },
              {
                label: (
                  <Box width={216}>
                    <Typography inline variant="subtitle1" weight="bold">
                      Multiple Approval
                    </Typography>
                    <p className={classes.approvalTypeDesc}>
                      Multiple recipient will do approval & the last person of
                      the recipient will sign the document based on digital
                      signature
                    </p>
                  </Box>
                ),
                value: 'multiple_approval',
              },
            ]}
          />
        </Card> */}
        {/* {!!signatureType && ( */}
        <Card title="Telkom Approval" style={{ marginTop: 24 }}>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              {/* {fields.length > (signatureType == 'am_approval' ? 1 : 2) && (
                  <Box mt={4}>
                    <Grid alignItems="center" container>
                      <Grid item xs={10}>
                        <div className={classes.dashed} />
                      </Grid>
                      <Grid item xs={2}>
                        <ButtonMinimal
                          label="delete reviewer"
                          onClick={onDeleteReviewer(index)}
                          variant="delete"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )} */}
              <Grid container spacing={2}>
                <Grid item lg={2} xs={12}>
                  <Box mt={2}>
                    <Typography color="general-mid" variant="body1">
                      Telkom Reviewer {index + 1}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    label="Name"
                    maxLength={60}
                    name={`agreement.${index}.name`}
                    required
                    shouldUnregister
                  />
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    label="Phone Number"
                    maxLength={60}
                    name={`agreement.${index}.phoneNumber`}
                    required
                    shouldUnregister
                  />
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    label="Title"
                    maxLength={60}
                    name={`agreement.${index}.position`}
                    required
                    shouldUnregister
                  />
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    label="Email"
                    maxLength={60}
                    name={`agreement.${index}.email`}
                    required
                    shouldUnregister
                  />
                </Grid>
              </Grid>
            </Fragment>
          ))}
          {/* {fields.length < 5 && signatureType == 'multiple_approval' && (
              <Box mt={4}>
                <Grid alignItems="center" container>
                  <Grid item xs={10}>
                    <div className={classes.dashed} />
                  </Grid>
                  <Grid item xs={2}>
                    <ButtonMinimal
                      label="add reviewer"
                      onClick={onAddRecipient}
                      variant="add"
                    />
                  </Grid>
                </Grid>
              </Box>
            )} */}
        </Card>
        {/* )} */}
      </Create>
      <Otp
        {...otpProperty}
        // fetchSendOTP={fetchSendOTP}
        description="You will get Peruri Digital Sign OTP code, please input for approval"
        id={offeringLetterId}
        // onClose={closeOtp}
        // onSubmit={onSubmitOtp}
        // open={otpForm}
        // repository={otpRepository}
        title="Please input your OTP code"
      />
    </>
  );
};

Agreement.defaultProps = {
  data: null,
};

Agreement.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  // setTab: PropTypes.func.isRequired
};

export default Agreement;
