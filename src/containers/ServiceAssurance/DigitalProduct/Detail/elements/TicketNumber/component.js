import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Text from '@__old/components/elements/Text';
import Button from '@__old/components/elements/Button';
import { TextField } from '@components/FormField';
import useActions from './hooks/useActions';

export default function Component(props) {
  const { modalTicketNumber, type } = props;

  const {
    control,
    formState,
    handleSubmit,
    onClose,
    searchError,
    asyncValidating,
    confirmation,
  } = useActions(props);

  const buttonDisable =
    !formState.isValid || !formState.isDirty || asyncValidating;

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalTicketNumber.open}>
      <form onSubmit={handleSubmit(confirmation)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Text variant="body1">
              {type === 'Edit' ? 'Edit' : 'Please add'} Ticket Number
            </Text>
          </Grid>
          <Grid align="center" item xs={12}>
            <Text color="grey" variant="caption">
              {type === 'Edit'
                ? `${type} ticket number if want to change to other one`
                : `${type} ticket number from Wowrack Indonesia’s application`}
            </Text>
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              helperText={searchError}
              label="Ticket Number"
              maxLength={10}
              name="ticketId"
              placeholder="#0000000"
              required
            />
          </Grid>
          <Grid align="center" item xs={12}>
            <br />
            <Button onClick={onClose} variant="ghost">
              CANCEL
            </Button>
            &nbsp;&nbsp;
            <Button disabled={buttonDisable} type="submit">
              OKAY
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.propTypes = {
  classes: PropTypes.object,
  modalTicketNumber: PropTypes.object,
  setModalTicketNumber: PropTypes.func,
  type: PropTypes.oneOf(['Add', 'Edit']),
};

Component.defaultProps = {
  classes: {},
  modalTicketNumber: {
    open: false,
  },
  setModalTicketNumber: () => {},
  type: 'Add',
};
