import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'redux-form';
import { Grid } from '@material-ui/core';
import TextField from '../../elements/TextField';
import Text from '../../elements/Text';

const Component = (props) => {
  const {
    invalid,
    setDisableBtnSubmitEmail,
    setEmailAssigned,
    setNameAssigned,
    setNumberAssigned,
  } = props;

  const [counterName, setCounterName] = useState(0);
  const [counterEmail, setCounterEmail] = useState(0);
  const [counterPhone, setCounterPhone] = useState(0);

  useEffect(() => {
    setDisableBtnSubmitEmail(invalid);
  }, [invalid]);

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
      setNameAssigned(e.target.value);
    } else if (e.target.name === 'email') {
      setCounterEmail(newValue.toString().length);
      setEmailAssigned(e.target.value);
    } else if (e.target.name === 'phoneNumber') {
      setCounterPhone(newValue.toString().length);
      setNumberAssigned(e.target.value);
    }
  };

  return (
    <Form>
      <Grid item>
        <Field
          component={TextField}
          label={required('Full Name')}
          name="fullName"
          onChange={handleCounter}
          placeholder="Full Name"
        />
        {charCount(counterName, 56)}
      </Grid>
      <Grid item>
        <Field
          component={TextField}
          label={required('Email')}
          name="email"
          onChange={handleCounter}
          placeholder="Email"
        />
        {charCount(counterEmail, 40)}
      </Grid>
      <Grid item>
        <Field
          component={TextField}
          label={required('WhatsApp Number')}
          name="phoneNumber"
          onChange={handleCounter}
          placeholder="WhatsApp Number"
        />
        {charCount(counterPhone, 17)}
      </Grid>
    </Form>
  );
};

Component.propTypes = {
  invalid: PropTypes.bool.isRequired,
  setDisableBtnSubmitEmail: PropTypes.func.isRequired,
  setEmailAssigned: PropTypes.func.isRequired,
  setNameAssigned: PropTypes.func.isRequired,
  setNumberAssigned: PropTypes.func.isRequired,
};

export default Component;
