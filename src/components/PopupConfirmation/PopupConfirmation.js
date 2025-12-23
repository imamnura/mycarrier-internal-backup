import React from 'react';
import { Box, Dialog, Grid, Zoom } from '@material-ui/core';
import CircleCancel from '../../assets/icon-v2/CircleCancel';
import CircleCheck from '../../assets/icon-v2/CircleCheck';
import Button from '../Button';
import Typography from '../Typography';
import useStyles from './styles';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const PopupConfirmation = () => {
  const { confirmationData } = usePopupConfirmation();
  const {
    action,
    message,
    variant = '',
    description = '',
    note = null,
    fitToContent = false,
  } = confirmationData;

  const checkIcon = {
    success: CircleCheck,
    failed: CircleCancel,
  };

  const Icon = checkIcon[variant] || CircleCheck;

  const classes = useStyles({ variant, fitToContent });

  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={!!message}
      TransitionComponent={Zoom}
    >
      {!!message && (
        <>
          {!!variant && <Icon className={classes.icon} />}
          <Box pb={3} textAlign="center">
            <Typography
              children={message}
              color="general-dark"
              variant="h5"
              weight="medium"
            />
            {!!description && (
              <Box py={1}>
                <Typography
                  children={description}
                  color="general-mid"
                  variant="body2"
                  weight="normal"
                />
              </Box>
            )}
            {!!note && <Box children={note} pt={1} />}
          </Box>
          <Grid container justifyContent="center" spacing={2}>
            {action.map((buttonProps, i) => (
              <Grid item key={`conf-act-${i}`}>
                <Button {...buttonProps} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Dialog>
  );
};

export default PopupConfirmation;
