import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Action from '../lib/Action';
import Content from '../lib/Content';
import Success from '../lib/Success';
import Microsite from '../../../layouts/Microsite';
import Text from '../../../__old/components/elements/Text';
import Dialog from '../../../__old/components/elements/Dialog';
import Button from '../../../__old/components/elements/Button';
import { CircularProgress, Grid } from '@material-ui/core';
import { schema, wordings, imageStatus, serviceSchema } from './constants';
import TextField from '../../../__old/components/elements/TextField';
import CallbackAlert from '../../../__old/components/elements/CallbackAlert';
import ConfirmationDialog from '../../../__old/components/elements/ConfirmationDialog';
import ListReviewer from './elements/ListReviewer';
import SendOTP from '../../../__old/components/fragments/SendOTP';
import { SERVICES, ROUTES } from '../../../__old/configs';
import ServiceDetail from './elements/ServiceDetail';
import { useRouter } from 'next/router';

export default function Component(props) {
  const { actions, isLoading } = props;
  const {
    query: { id },
  } = useRouter();

  const [data, setData] = useState(null);
  const [note, setNote] = useState('');
  const [actionType, setActiontype] = useState('');
  const [confirmation, setConfirmation] = useState({ actions: [] });
  const [alert, setAlert] = useState({});

  const [otpForm, setOtpForm] = useState(false);

  useEffect(() => {
    if (id) {
      actions.getApprovalBakes(id, setData);
    }
  }, [id]);

  const renderAdditionalContent = () => (
    <Fragment>
      <ServiceDetail data={data} schema={serviceSchema} />
      <ListReviewer data={data.telkomApproval} />
    </Fragment>
  );

  const renderContent = () => {
    if (!data || isLoading) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '30vh' }}>
          {isLoading ? (
            <CircularProgress style={{ color: '#DE1B1B' }} />
          ) : (
            <Text variant="body2">Data Not Found</Text>
          )}
        </div>
      );
    }

    return (
      <Content
        additionalContent={renderAdditionalContent()}
        data={data}
        header={{
          title: 'BAKES Approval Request',
          subtitle: `Account Manager: ${data.nameOfCreatedBy}`,
        }}
        label={`Anda mendapatkan approval request untuk New BAKES dengan data sebagai berikut:`}
        schema={schema}
      />
    );
  };

  const renderAction = data && (
    <Action
      actions={[
        {
          label: 'Reject',
          onClick: () =>
            setConfirmation({
              ...wordings.reject.confirmation,
              actions: [
                { label: 'Back', action: closeForm, fullWidth: true },
                {
                  label: 'Reject',
                  action: () => setActiontype('rejected'),
                  fullWidth: true,
                },
              ],
            }),
        },
        {
          label: 'Return',
          onClick: () =>
            setConfirmation({
              ...wordings.return.confirmation,
              actions: [
                { label: 'Back', action: closeForm, fullWidth: true },
                {
                  label: 'Return',
                  action: () => setActiontype('returned'),
                  fullWidth: true,
                },
              ],
            }),
        },
        {
          label: 'Approve',
          onClick: () =>
            setConfirmation({
              ...wordings.approve.confirmation,
              actions: [
                { label: 'Back', action: closeForm, fullWidth: true },
                {
                  label: 'Approve',
                  action: () => setActiontype('approved'),
                  fullWidth: true,
                },
              ],
            }),
        },
      ]}
      label="Will you approve the New BAKES Request with data above?"
    />
  );

  const closeForm = () => {
    setConfirmation({ actions: [] });
    setActiontype('');
    setNote('');
    setAlert({});
  };

  const updateStatus = () => {
    const submitStatus =
      actionType === 'approved' ? 'telkom approval' : actionType;
    actions.updateStatus(id, { status: submitStatus, note }, setAlert, setData);
  };

  const onSubmit = () => {
    if (
      actionType === 'approved' &&
      data.isLastReviewer &&
      data.approvalType === 'digital'
    ) {
      setOtpForm(true);
    } else {
      updateStatus();
    }
  };

  const wordStatus = actionType.slice(0, actionType.length - 2);

  const validate = () => {
    if (note.length > 255) {
      return {
        invalid: true,
        touched: true,
        error: `"${
          actionType === 'approved' ? 'Note' : 'Reason'
        }" length must be less than or equal to 255 characters long`,
      };
    }
    return {};
  };

  const renderForm = (
    <Dialog id="renderform" maxWidth="xs" onClose={closeForm} open={actionType}>
      <Grid container spacing={2} style={{ padding: '8px 16px 16px 16px' }}>
        <Grid align="center" item xs={12}>
          <Text variant="subtitle2">
            {actionType === 'approved'
              ? 'Please give note of approve'
              : `Give the detail reason why you ${wordStatus} it`}
          </Text>
        </Grid>
        <Grid xs={12}>
          <TextField
            id="note"
            input={{ value: note, onChange: (e) => setNote(e.target.value) }}
            inputProps={{
              rows: note.length > 105 ? 0 : 3,
            }}
            label={actionType === 'approved' ? 'Note' : 'Reason'}
            meta={validate()}
            multiline
          />
        </Grid>
        <Grid align="center" style={{ paddingTop: 32 }} xs={12}>
          <Button id="cancel" onClick={closeForm} variant="ghost">
            Cancel
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            disabled={!note || validate().invalid}
            id="submit"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );

  const onSubmitOTP = async () => {
    await updateStatus();
    await closeForm();
    await setOtpForm(false);
  };

  const renderOTP = (
    <Dialog
      id="renderotp"
      maxWidth="xs"
      onClose={() => setOtpForm(false)}
      open={otpForm}
    >
      <SendOTP
        endpoint={{
          send: SERVICES.BAKES_APPROVAL_SEND_OTP,
          resend: SERVICES.BAKES_APPROVAL_RESEND_OTP,
          verify: SERVICES.BAKES_APPROVAL_VERIFY_OTP,
        }}
        id={data?.bakesId}
        keyId="bakesId"
        note={note}
        onClose={() => setOtpForm(false)}
        onSubmit={onSubmitOTP}
      />
    </Dialog>
  );
  const status = data?.telkomApprovalStepStatus ? 'approved' : data?.status;

  const renderStatusChanged = isLoading ? (
    <div style={{ textAlign: 'center', paddingTop: '40vh', height: '100vh' }}>
      <CircularProgress style={{ color: '#DE1B1B' }} />
    </div>
  ) : (
    (['rejected', 'returned'].includes(data?.status) ||
      data?.telkomApprovalStepStatus) && (
      <Success
        buttonLabel="View Request"
        image={imageStatus(status)}
        label={`${data?.bakesId} has been ${status}. View that request now.`}
        url={ROUTES.BAKES_DETAIL(data?.bakesId)}
        // noButton={true}
      />
    )
  );

  return (
    <Fragment>
      <Microsite
        action={renderAction}
        children={renderContent()}
        completed={renderStatusChanged}
      />
      {renderForm}
      <ConfirmationDialog {...confirmation} onClose={closeForm} />
      <CallbackAlert
        {...alert}
        onClose={alert.success ? closeForm : () => setAlert({})}
      />
      {renderOTP}
    </Fragment>
  );
}

Component.propTypes = {
  actions: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  otpCounter: PropTypes.object.isRequired,
};
