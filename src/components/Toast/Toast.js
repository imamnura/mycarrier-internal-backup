import React, { forwardRef } from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import PropTypes from 'prop-types';
import Cancel from '@assets/icon-v2/Cancel';
import Typography from '@components/Typography';

import { SnackbarContent, useSnackbar } from 'notistack';

const Toast = forwardRef(({ id, message, variant, ...props }, ref) => {
  const classes = useStyles();

  const { closeSnackbar } = useSnackbar();

  const onClose = () => closeSnackbar(id);

  return (
    <SnackbarContent
      {...props}
      ref={ref}
      className={clsx(classes.container, {
        [classes.bgSuccess]: variant === 'success',
        [classes.bgError]: variant === 'error',
      })}
    >
      <Typography variant="body" weight="bold" color="white">
        {message}
      </Typography>
      <Cancel className={classes.closeButton} onClick={onClose} />
    </SnackbarContent>
  );
});

Toast.defaultProps = {
  variant: 'success',
};

Toast.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'error']),
};

export default Toast;
