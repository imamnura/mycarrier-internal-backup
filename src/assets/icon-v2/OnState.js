import { SvgIcon } from '@material-ui/core';
import React from 'react';

const OnState = (props) => (
  <SvgIcon {...props} color="inherit" viewBox="0 0 40 40">
    <circle
      cx="20"
      cy="20"
      fill="white"
      r="18"
      stroke="currentColor"
      strokeWidth="4"
    />
    <circle cx="20" cy="20" fill="currentColor" r="10" />
  </SvgIcon>
);

export default OnState;
