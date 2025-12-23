import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Button from '@components/Button';
import Dialog from '@__old/components/elements/Dialog';
import Dropdown from '@components/Dropdown';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import { TextField } from '@components/FormField';

export default function InputParameter(props) {
  const { onClose, open } = props;

  const {
    control,
    filterCPName,
    validCpname,
    formState: { isValid },
    handleInputParameter,
    handleSubmit,
    isTelkomsel,
  } = useActions(props);

  const TelkomselParameter = () => {
    return (
      <>
        <Grid item xs={12}>
          <TextField
            control={control}
            label="SID"
            maxLength={160}
            name="sid"
            required
          />
        </Grid>
        <Grid container item justifyContent="space-between" spacing={2} xs={12}>
          <Grid item xs={8}>
            <TextField
              control={control}
              disabled
              label="CP Name"
              maxLength={17}
              name="cpName"
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Dropdown {...filterCPName} staticWidth={125} />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit(handleInputParameter)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Typography variant="h4" weight="bold">
              Before complete request, please fill the data below
            </Typography>
          </Grid>
          <Grid align="center" item xs={12}>
            <Typography variant="body1">
              You can input{' '}
              {isTelkomsel
                ? `CP Name, Sender ID, and SID from Telkomsel's`
                : `Sender ID from provider's`}{' '}
              email
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              disabled
              label="Sender ID"
              maxLength={40}
              name="senderId"
              required
            />
          </Grid>
          {isTelkomsel && TelkomselParameter()}
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Note"
              maxLength={3000}
              minRows={3}
              multiline
              name="note"
            />
          </Grid>
          <Grid align="center" item xs={12}>
            <Button onClick={onClose} variant="ghost">
              CANCEL
            </Button>
            &nbsp;
            <Button disabled={!isValid || !validCpname} type="submit">
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

InputParameter.defaultProps = {
  onClose: () => {},
  open: false,
};

InputParameter.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
