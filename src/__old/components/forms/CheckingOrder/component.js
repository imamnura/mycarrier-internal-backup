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
        <Grid className={classes.paddingGrid} container spacing={2}>
          <Grid align="center" item xs={12}>
            <Text>Please filled the data to be sent to customer</Text>
          </Grid>
          <Grid align="center" item xs={12}>
            <Text className={classes.subTitle}>
              Data will be sent according the active date that has been
              requested by customer
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              disabled
              label="IP Customer"
              name="ip"
              placeholder="Input IP"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              label="Port"
              name="port"
              placeholder="Input Port"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              label="Username"
              name="username"
              placeholder="Input Username"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              label="Password"
              name="password"
              placeholder="Input Password"
              type="password"
            />
          </Grid>
          <Grid align="center" item xs={12}>
            <br />
          </Grid>
          <Grid align="center" item xs={12}>
            <Button onClick={onClose} variant="ghost">
              CANCEL
            </Button>
            &nbsp;
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
