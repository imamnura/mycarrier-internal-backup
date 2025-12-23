import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, submit } from 'redux-form';
import TextField from '../../elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import Button from '../../elements/Button';

export default function Component(props) {
  const {
    asyncValidating,
    invalid,
    isLoading,
    onClose,
    submitting,
    handleSubmit,
    maxLength,
    dispatch,
    type,
  } = props;

  const [counterTicketNumber, setCounterTicketNumber] = useState(0);

  const buttonDisable = invalid || submitting || isLoading || asyncValidating;

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
    if (e.target.name === 'ticketId') {
      setCounterTicketNumber(newValue.toString().length);
    }
  };

  const confirmation = () =>
    props.setConfirmation({
      actions: [
        { label: 'No', action: props.clearConfirmation },
        { label: 'Yes', action: () => dispatch(submit('ticketNumberForm')) },
      ],
      title: `Are you sure want to ${type} ticket number?`,
    });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Text variant="body1">
            {type === 'Edit' ? 'Edit' : 'Please add'} Ticket Number
          </Text>
        </Grid>
        <Grid align="center" item xs={12}>
          <Text color="grey" variant="caption">
            {`${type} ticket number from Wowrack Indonesia’s application`}
          </Text>
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            id="ticketnumber"
            label="Ticket Number"
            name="ticketId"
            onChange={handleCounter}
            placeholder="#0000000"
            type="text"
          />
          {counter(counterTicketNumber, maxLength)}
        </Grid>
        <Grid align="center" item xs={12}>
          <br />
          <Button onClick={onClose} variant="ghost">
            CANCEL
          </Button>
          &nbsp;&nbsp;
          <Button disabled={buttonDisable} onClick={confirmation}>
            OKAY
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

Component.propTypes = {
  asyncValidating: PropTypes.string.isRequired,
  classes: PropTypes.object,
  clearConfirmation: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  maxLength: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  setConfirmation: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  type: PropTypes.oneOf(['Add', 'Edit']),
};

Component.defaultProps = {
  classes: {},
  invalid: true,
  isLoading: false,
  submitting: false,
  type: 'Add',
};
