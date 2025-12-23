import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Text from '../../../__old/components/elements/Text';
import Button from '../../Button';
import useActions from './hooks/useActions';
import { TextField } from '../../FormField';

export default function Component(props) {
  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
  } = useActions(props);

  const {
    caption,
    maxLength,
    label,
    onSubmit,
    onClose,
    name,
    titleText,
    textInfo,
    submitText,
    type,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            {textInfo || `Please give the note of ${type}`}
          </Text>
        </Grid>
        <Grid item xs={12}>
          <TextField
            control={control}
            label={label}
            maxLength={maxLength}
            name={name}
            required
            {...props}
          />
        </Grid>
        <Grid item xs={12}>
          <Text variant="caption">
            {caption ||
              `Once you ${type} this, it will be processed and data will be sent to the
            customer automatically`}
          </Text>
        </Grid>
        <Grid container item justifyContent="center" pt={2} spacing={2}>
          <Grid item>
            <Button onClick={onClose} variant="ghost">
              CANCEL
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={!isValid || !isDirty} type="submit">
              {submitText || 'SUBMIT'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

Component.propTypes = {
  caption: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
  name: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  textInfo: PropTypes.string,
  titleText: PropTypes.string,
  type: PropTypes.string,
};

Component.defaultProps = {
  caption: '',
  label: 'Please describe the reason..',
  name: 'reason',
  submitText: '',
  textInfo: '',
  titleText: '',
  type: 'reject',
};
