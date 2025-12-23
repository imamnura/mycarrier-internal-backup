import Button from '@components/Button';
import { TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';

const SendNDE = (props) => {
  const { control, handleSubmit, onClose, onSubmit, open } = useAction(props);

  const classes = useStyles();

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={open}>
      <Box sx={{ width: 320 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            textAlign: 'center',
            width: 310,
          }}
        >
          <Typography variant="h5" weight="medium">
            Input Invoice Number
          </Typography>
          <Typography color="general-mid" variant="caption">
            By issuing invoice, you will completed the settlement
          </Typography>
        </Box>
      </Box>
      <Box mt={3} width="100%">
        <Grid container justifyContent="flex-start" spacing={2}>
          <Grid item xs={12}>
            <div>
              <TextField
                control={control}
                label="Invoice Number"
                name="invoiceNumber"
                required
                shouldUnregister
              />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <div className={classes.actionDivider} />
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </Box>
    </Dialog>
  );
};

export default SendNDE;
