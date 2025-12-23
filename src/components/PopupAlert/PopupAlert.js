import React from 'react';
import clsx from 'clsx';
import { Box, Dialog, Zoom } from '@material-ui/core';
import CircleCancel from '../../assets/icon-v2/CircleCancel';
import CircleCheck from '../../assets/icon-v2/CircleCheck';
import Button from '../Button';
import Typography from '../Typography';
import useStyles from './styles';
import Loading from '../Loading';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import NoResultIllustration from '@assets/Svg/NoResult';

const PopupAlert = () => {
  const { alertData } = usePopupAlert();
  const {
    buttonLabel,
    message,
    onClose,
    variant,
    customAction = [],
  } = alertData;
  const loading = variant === 'loading';
  const classes = useStyles({ variant });

  const defaultIcon = {
    success: CircleCheck,
    failed: CircleCancel,
  };

  const customIcon = {
    noResult: NoResultIllustration,
  };

  const Icon = defaultIcon[variant] || customIcon[variant] || CircleCheck;

  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={!!message}
      TransitionComponent={Zoom}
    >
      {!!message && (
        <>
          {!loading ? (
            <Icon
              className={clsx(classes.icon, {
                [classes.newPhaseIcon]: !!customIcon[variant],
              })}
            />
          ) : (
            <div className={classes.loading}>
              <Loading color="primary" size="huge" />
            </div>
          )}
          <Box py={4} textAlign="center">
            <Typography
              children={message}
              color="general-dark"
              variant="h5"
              weight="medium"
            />
          </Box>
          {customAction.length ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {customAction.map((act, index) => (
                <Button key={`act-${index}`} children={act.label} {...act} />
              ))}
            </div>
          ) : (
            <Button
              children={buttonLabel}
              disabled={loading}
              onClick={onClose}
            />
          )}
        </>
      )}
    </Dialog>
  );
};

export default PopupAlert;
