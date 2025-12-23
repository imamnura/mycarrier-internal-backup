import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import { Field } from 'redux-form';
import TextField from '../../elements/TextField';
import MaskedCpName from './elements/MaskedCPName';
import Button from '../../elements/Button';

const schema = [
  { name: 'cpname', label: 'CP Name', masked: true, grid: 12, autoFocus: true },
  { name: 'sid', label: 'SID', grid: 6 },
  { name: 'availableSenderId', label: 'Sender ID', grid: 6, disabled: true },
  { name: 'noteReview', label: 'Notes', grid: 12, multiline: true, rows: 4 },
];

export default class Component extends React.Component {
  _renderInput = ({
    name,
    label,
    masked,
    disabled,
    autoFocus,
    multiline,
    rows,
  }) => {
    const inputMasked = masked
      ? { InputProps: { inputComponent: MaskedCpName } }
      : {};
    return (
      <Field
        autoFocus={autoFocus}
        component={TextField}
        disabled={disabled}
        label={label}
        name={name}
        placeholder=""
        {...inputMasked}
        multiline={multiline}
        rows={rows}
      />
    );
  };

  render() {
    const { invalid, onClose, submitting, handleSubmit } = this.props;
    const buttonDisable = invalid || submitting;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Text variant="body1">
              Before complete request, please filled CP Name, SID and Sender ID
              list
            </Text>
          </Grid>
          <Grid align="center" item xs={12}>
            <Text color="grey" variant="caption">
              You can view CP Name, SID and Sender ID from Telkomsel on email
            </Text>
          </Grid>
          {schema.map((item) => (
            <Grid item key={item.name} xs={item.grid}>
              {this._renderInput(item)}
            </Grid>
          ))}
          <Grid item xs={12} />
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
  classes: PropTypes.object.isRequired,
  getDownload: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};
