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
          <Grid align="center" item xs={12}>
            <Text variant="body1">
              Before complete request, please filled notes
            </Text>
          </Grid>
          <Grid align="center" item xs={12}>
            <Text color="grey" variant="caption">
              You can view notes on detail page
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              label="Notes"
              multiline={true}
              name="noteReview"
              onChange={(e, newValue) => {
                this.setState({ noteReview: newValue });
              }}
              rows={4}
              type="text"
            />
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
