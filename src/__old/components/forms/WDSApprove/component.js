import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '../../elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import Button from '../../elements/Button';

export default class Component extends React.Component {
  state = {
    counter: 0,
    coupon: null,
    noteApprove: null,
  };

  handleAprove = (noteApprove) => {
    this.setState({ noteApprove });
  };
  handleSave = (values) => {
    const { file } = this.state;
    this.props.onSubmit({ ...values, file });
  };

  render() {
    const { invalid, isLoading, onClose, submitting, handleSubmit, maxLength } =
      this.props;
    const { noteApprove, coupon } = this.state;
    const buttonDisable =
      !coupon || invalid || !noteApprove || submitting || isLoading;

    return (
      <form onSubmit={handleSubmit(this.handleSave)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Text variant="h5">
              PLease filled coupon code to be sent to customer
            </Text>
          </Grid>
          <Grid align="center" item xs={12}>
            <Text variant="body1">
              Data will be sent according that has been requested by customer
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              label="Coupon Code"
              name="couponCode"
              onChange={(e, newValue) => {
                this.setState({
                  counter: newValue.toString().length,
                  coupon: newValue,
                });
              }}
              placeholder="Please describe the coupon.."
              type="text"
            />
            <Field
              component={TextField}
              label="Note"
              multiline={true}
              name="noteApprove"
              onChange={(e, newValue) => {
                this.setState({
                  counter: newValue.toString().length,
                  noteApprove: newValue,
                });
              }}
              placeholder="Please describe the notes.."
              rows={4}
              type="text"
            />
            <Grid container style={{ width: '100%' }}>
              <Grid item xs={9}>
                {/* {this.state.counter} */}
                {/* <= 0 && <Text color="primary" variant="status" >
                You didn't give any reason, please describe it</Text>}*/}
              </Grid>
              <Grid item style={{ textAlign: 'right' }} xs={3}>
                <Text variant="status">
                  {this.state.counter}/{maxLength}
                </Text>
              </Grid>
            </Grid>
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
  maxLength: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};
Component.defaultProps = {
  classes: {},
  invalid: true,
  isLoading: false,
  submitting: false,
};
