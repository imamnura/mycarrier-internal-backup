import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '../../elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import Button from '../../elements/Button';

export default class Component extends React.Component {
  state = {
    noteReview: null,
  };
  maxLength = 1500;
  handleNotes = (noteReview) => {
    this.setState({ noteReview });
  };
  handleSave = (values) => {
    const { file } = this.state;
    this.props.onSubmit({ ...values, file });
  };

  render() {
    const { invalid, isLoading, onClose, submitting, handleSubmit } =
      this.props;
    const { noteReview } = this.state;
    const buttonDisable = invalid || !noteReview || submitting || isLoading;

    return (
      <form onSubmit={handleSubmit(this.handleSave)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="left" item xs={12}>
            <Text variant="body1">Please give note of approve</Text>
          </Grid>
          <Grid align="left" item xs={12}>
            <Text color="grey" variant="caption">
              Please describe the note...
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              label="Notes"
              multiline={true}
              name="noteProgress"
              onChange={(e, newValue) => {
                this.setState({ noteReview: newValue });
              }}
              rows={4}
              type="text"
            />
          </Grid>
          <Grid align="left" item xs={12}>
            <Text color="grey" variant="caption">
              Once you approve this, it will be process and data will be sent to
              customer automatically.
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
