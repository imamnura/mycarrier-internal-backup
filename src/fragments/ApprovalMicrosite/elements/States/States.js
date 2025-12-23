/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { Box } from '@material-ui/core';
import useStyles from './styles';
import useResponsive from '@utils/hooks/useResponsive';
import { image } from '@configs';

const States = (props) => {
  const { type, message, action } = props;

  const mobileClient = useResponsive('xs');

  const classes = useStyles({ mobileClient });

  const imgSource = {
    rejected: image.mailRejected,
    approved: image.mailApproved,
    returned: image.mailReturned,
  }[type];

  return (
    <>
      <img className={classes.icon} src={imgSource} />
      <Box
        maxWidth={mobileClient ? 240 : 320}
        my={mobileClient ? 3 : 4}
        textAlign="center"
      >
        <Typography
          variant={mobileClient ? 'subtitle1' : 'h5'}
          weight={mobileClient ? 'bold' : 'medium'}
        >
          {message}
        </Typography>
      </Box>
      {action && <Button {...action} />}
    </>
  );
};

States.defaultProps = {
  action: null,
  message: '',
  type: 'approved',
};

States.propTypes = {
  action: PropTypes.object,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default States;
