import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'redux-form';
import { Grid, CircularProgress } from '@material-ui/core';
import TextField from '../../elements/TextField';
import Text from '../../elements/Text';
import Button from '../../elements/Button';

const Component = (props) => {
  const {
    classes,
    isLoading,
    setIsChooseOption,
    setIsFormEmail,
    setIsPreviewAM,
    invalid,
    handleSubmit,
    isReassign,
    setToggleReassign,
  } = props;
  const disabled = invalid;

  const [counterName, setCounterName] = useState(0);
  const [counterEmail, setCounterEmail] = useState(0);
  const [counterPhone, setCounterPhone] = useState(0);

  const handleCancelFormEmail = () => {
    setIsFormEmail(false);
    if (isReassign) {
      setIsPreviewAM(true);
      setToggleReassign(false);
    } else {
      setIsChooseOption(true);
    }
  };

  const required = (label) => {
    return (
      <>
        <Text color="primary" variant="subtitle2">
          *{' '}
        </Text>
        {label}
      </>
    );
  };

  const charCount = (counter, maxLength) => {
    return (
      <Grid container style={{ width: '100%' }}>
        <Grid item style={{ textAlign: 'right' }} xs={12}>
          <Text variant="status">
            {counter}/{maxLength}
          </Text>
        </Grid>
      </Grid>
    );
  };

  const handleCounter = (e, newValue) => {
    if (e.target.name === 'fullName') {
      setCounterName(newValue.toString().length);
    } else if (e.target.name === 'email') {
      setCounterEmail(newValue.toString().length);
    } else if (e.target.name === 'phoneNumber') {
      setCounterPhone(newValue.toString().length);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          Type Email Recipient
        </Text>
      </div>
      <>
        <Grid className={classes.input} item>
          <Field
            component={TextField}
            label={required('Full Name')}
            name="fullName"
            onChange={handleCounter}
            placeholder="Full Name"
          />
          {charCount(counterName, 56)}
        </Grid>
        <Grid className={classes.input} item>
          <Field
            component={TextField}
            label={required('Email')}
            name="email"
            onChange={handleCounter}
            placeholder="Email"
          />
          {charCount(counterEmail, 40)}
        </Grid>
        <Grid className={classes.input} item>
          <Field
            component={TextField}
            label={required('WhatsApp Number')}
            name="phoneNumber"
            onChange={handleCounter}
            placeholder="WhatsApp Number"
          />
          {charCount(counterPhone, 17)}
        </Grid>
      </>
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Button
          onClick={handleCancelFormEmail}
          style={{ marginRight: '2em' }}
          variant="ghost"
        >
          Cancel
        </Button>
        <Button disabled={disabled} type="submit">
          {isLoading ? (
            <CircularProgress
              size={17}
              style={{ marginTop: 5, color: '#FFFFFF' }}
              thickness={3}
            />
          ) : (
            'Send'
          )}
        </Button>
      </div>
    </Form>
  );
};

Component.propTypes = {
  action: PropTypes.object,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  isReassign: PropTypes.bool,
  setIsChooseOption: PropTypes.bool,
  setIsFormEmail: PropTypes.bool,
  setIsPreviewAM: PropTypes.bool,
  setToggleReassign: PropTypes.bool,
};

Component.defaultProps = {
  action: {},
  classes: {},
  invalid: false,
  isLoading: false,
  isReassign: false,
  setIsChooseOption: false,
  setIsFormEmail: true,
  setIsPreviewAM: false,
  setToggleReassign: false,
};

export default Component;
