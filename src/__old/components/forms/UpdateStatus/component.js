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
    maxLength,
    dispatch,
    title,
    caption,
    placeholder,
    confirmtext,
  } = props;

  const [counterNote, setCounterNote] = useState(0);

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
    if (e.target.name === 'note') {
      setCounterNote(newValue.toString().length);
    }
  };

  const confirmation = () =>
    props.setConfirmation({
      actions: [
        { label: 'No', action: props.clearConfirmation },
        { label: 'Yes', action: () => dispatch(submit('updateStatusForm')) },
      ],
      title: `${confirmtext}`,
    });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Text variant="body1">Please give note of {title}</Text>
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            id="updatestatus"
            label="Note"
            multiline={true}
            name="note"
            onChange={handleCounter}
            placeholder={placeholder}
            rows={4}
            type="text"
          />
          {counter(counterNote, maxLength)}
        </Grid>
        <Grid item xs={12}>
          <Text variant="caption">
            Once you {caption}, it will be process and data will be sent to
            customer automatically.
          </Text>
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
  caption: PropTypes.string,
  classes: PropTypes.object,
  clearConfirmation: PropTypes.func.isRequired,
  confirmtext: PropTypes.string,
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
  caption: 'updated the status',
  classes: {},
  confirmtext: 'Are you sure want to update status this issue?',
  invalid: true,
  isLoading: false,
  placeholder: 'Please desribe the reason..',
  submitting: false,
  title: 'update status',
};
