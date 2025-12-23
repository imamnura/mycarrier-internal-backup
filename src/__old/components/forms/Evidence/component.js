import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '../../elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import Button from '../../elements/Button';
import UploadFile from '../../elements/UploadFile';

export default class Component extends React.Component {
  state = {
    counter: 0,
    evidence: null,
    file: null,
  };
  maxLength = 1500;
  handleChangeFile = (file) => {
    this.setState({ file });
  };

  // handleEvidence = evidence => {
  //   this.setState({ evidence });
  // }

  handleSave = (values) => {
    const { file } = this.state;
    this.props.onSubmit({ ...values, file });
  };

  render() {
    const { allowed, invalid, isLoading, onClose, submitting, handleSubmit } =
      this.props;
    const { file, evidence } = this.state;

    const buttonDisable =
      !file || !evidence || isLoading || invalid || submitting;

    return (
      <form onSubmit={handleSubmit(this.handleSave)}>
        <Grid container spacing={2} style={{ padding: '24px 24px' }}>
          <Grid align="center" item xs={12}>
            <Text variant="subtitle1">
              Are you sure this trouble has been solved? Please complete data to
              be sent to customer
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              fullWidth={true}
              id="evidence"
              label="Evidence to Customer"
              multiline={true}
              name="evidence"
              onChange={(e, newValue) => {
                this.setState({
                  counter: newValue.toString().length,
                  evidence: newValue,
                });
              }}
              placeholder="Evidence to Customer"
              rows={6}
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
                  {this.state.counter}/{this.maxLength}
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <UploadFile
              accept={allowed}
              fileName={file ? file.name : ''}
              id="uploadfile"
              label="evidence"
              maxSize={512000}
              onChange={this.handleChangeFile}
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
  allowed: PropTypes.array,
  change: PropTypes.func.isRequired,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};
Component.defaultProps = {
  allowed: ['.pdf'],
  classes: {},
  invalid: true,
  isLoading: false,
  submitting: false,
};
