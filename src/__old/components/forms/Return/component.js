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
  };
  maxLength = 1500;

  render() {
    const {
      invalid,
      isLoading,
      onClose,
      submitting,
      handleSubmit,
      maxLength,
      titleText,
      textInfo,
      label,
    } = this.props;
    const buttonDisable = invalid || submitting || isLoading;

    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {titleText && (
            <Grid align="center" item xs={12}>
              <Text variant="h4" weight="bold">
                {titleText}
              </Text>
            </Grid>
          )}
          <Grid align="center" item xs={12}>
            <Text variant="body1">
              {textInfo || 'Please give the reason of return'}
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              label={label}
              multiline={true}
              name="revision"
              onChange={(e, newValue) => {
                this.setState({ counter: newValue.toString().length });
              }}
              placeholder="Please describe the reason.."
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
          <Grid item xs={12}>
            <Text variant="caption">
              Once you returned, it will be processed and data will be return to
              the customer automatically.
            </Text>
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
  label: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  textInfo: PropTypes.string,
  titleText: PropTypes.string,
};
Component.defaultProps = {
  classes: {},
  invalid: true,
  isLoading: false,
  label: null,
  submitting: false,
  textInfo: null,
  titleText: null,
};
