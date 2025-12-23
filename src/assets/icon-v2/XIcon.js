import { SvgIcon } from '@material-ui/core';
import React from 'react';

const XIcon = (props) => (
  <SvgIcon {...props} color="inherit" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="12" fill="#DE1B1B" />
    <path
      d="M17 7L7 17"
      stroke="white"
      stroke-width="1.67"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7 7L17 17"
      stroke="white"
      stroke-width="1.67"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </SvgIcon>
);

export default XIcon;
