'use client';

import { Box, Divider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Typography from '@components/Typography';
import { image } from '@configs';
import Auth from '@layouts/Auth';
import { talkToHelpdesk } from '@utils/common';
import LoginForm from './elements/LoginForm';
import useStyles from './styles';
import useAnalytics from '@utils/hooks/useAnalytics';

const Login = () => {
  const classes = useStyles();
  const useMessage = useState(' ');

  const { eventTimerStart } = useAnalytics();

  useEffect(() => {
    eventTimerStart('submit_login');
  }, []);

  return (
    <Auth>
      <div className={classes.centered}>
        <img src={image.logoSquare} alt="logo-square" />
        <Box mt={5}>
          <Typography
            children="Welcome to MyCarrier!"
            variant="h4"
            weight="medium"
          />
        </Box>
        <Box mt={2}>
          <Typography
            children="Type your details below "
            color="general-mid"
            variant="subtitle1"
          />
        </Box>
        <LoginForm useMessage={useMessage} />
        <Box my={5} width="100%">
          <Divider />
        </Box>
        <Typography color="general-mid" variant="caption">
          Having trouble?
          <Typography
            children=" Talk to Helpdesk"
            className={classes.link}
            color="primary-main"
            onClick={talkToHelpdesk}
            variant="caption"
            weight="bold"
          />
          .
        </Typography>
      </div>
    </Auth>
  );
};

export default Login;
