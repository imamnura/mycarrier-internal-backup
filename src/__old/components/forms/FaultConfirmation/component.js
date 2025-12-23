import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '../../elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import Button from '../../elements/Button';

export default class Component extends React.Component {
  render() {
    const { classes, invalid, isLoading, onClose, submitting, handleSubmit } =
      this.props;
    const buttonDisable = invalid || submitting || isLoading;

    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ padding: '24px 24px' }}>
          <Grid align="center" item xs={12}>
            <Text classes={classes.bold} variant="subtitle1">
              Please filled the data to be sent to operator
            </Text>
            <br />
            <Text variant="caption">
              Data will be sent according the date of issue that has been
              requested by customer
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              disabled
              fullWidth={true}
              label="Trouble Category"
              name="troubleCategory"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              disabled
              fullWidth={true}
              label="Date of trouble occurs"
              name="date"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              disabled
              fullWidth={true}
              label="Sender ID"
              name="senderID"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              disabled
              fullWidth={true}
              label="B Number"
              name="bNumber"
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              disabled
              fullWidth={true}
              label="Log Request"
              multiline={true}
              name="logRequest"
              placeholder="Describe the log request"
              rows={4}
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              disabled
              fullWidth={true}
              label="Respond"
              multiline={true}
              name="respond"
              placeholder="Describe the respond"
              rows={4}
              type="text"
            />
          </Grid>
          <Grid align="center" item xs={6}>
            <Button onClick={onClose} variant="secondary">
              CANCEL
            </Button>
          </Grid>
          <Grid align="center" item xs={6}>
            <Button disabled={buttonDisable} type="submit">
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}
Component.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};
Component.defaultProps = {
  classes: {},
  invalid: true,
  isLoading: false,
  submitting: false,
};
