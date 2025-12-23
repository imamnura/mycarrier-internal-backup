import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, submit } from 'redux-form';
import TextField from '../../elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import Button from '../../elements/Button';

export default function Component(props) {
  const {
    invalid,
    isLoading,
    onClose,
    submitting,
    handleSubmit,
    dispatch,
    placeholder,
  } = props;

  const [counterUsername, setCounterUsername] = useState(0);
  const [counterPassword, setCounterPassword] = useState(0);

  const buttonDisable = invalid || submitting || isLoading;

  const counter = (counterField, maxLengthField) => {
    return (
      <Grid container style={{ width: '100%' }}>
        <Grid item style={{ textAlign: 'right' }} xs={12}>
          <Text variant="status">
            {counterField}/{maxLengthField}
          </Text>
        </Grid>
      </Grid>
    );
  };

  const handleCounter = (e, newValue) => {
    if (e.target.name === 'username') {
      setCounterUsername(newValue.toString().length);
    }
    if (e.target.name === 'password') {
      setCounterPassword(newValue.toString().length);
    }
  };

  const confirmation = () =>
    props.setConfirmation({
      actions: [
        { label: 'No', action: props.clearConfirmation },
        {
          label: 'Yes',
          action: () => dispatch(submit('submitUsernamePassword')),
        },
      ],
      title: `Are you sure this login data was correct?`,
    });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Text variant="h4" weight="bold">
            Please filled Login Data to be sent to customer
          </Text>
        </Grid>
        <Grid align="center" item xs={12}>
          <Text variant="subtitle1" weight="regular">
            Data will be sent according that has been requested by customer
          </Text>
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            id="updateusername"
            label="Username"
            multiline={true}
            name="username"
            onChange={handleCounter}
            placeholder={placeholder}
            type="text"
          />
          {counter(counterUsername, 40)}
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            id="updatepassword"
            label="Password"
            multiline={true}
            name="password"
            onChange={handleCounter}
            placeholder={placeholder}
            type="text"
          />
          {counter(counterPassword, 40)}
        </Grid>
        <Grid align="center" item xs={12}>
          <br />
          <Button onClick={onClose} variant="ghost">
            CANCEL
          </Button>
          &nbsp;&nbsp;
          <Button disabled={buttonDisable} onClick={confirmation}>
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

Component.propTypes = {
  classes: PropTypes.object,
  clearConfirmation: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  maxLength: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setConfirmation: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  title: PropTypes.string,
};

Component.defaultProps = {
  classes: {},
  invalid: true,
  isLoading: false,
  placeholder: 'Please desribe the reason..',
  submitting: false,
  title: 'update status',
};
