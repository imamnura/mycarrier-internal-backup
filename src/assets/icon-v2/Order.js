import { SvgIcon } from '@material-ui/core';
import React from 'react';

const Order = (props) => (
  <SvgIcon {...props} color="inherit" viewBox="0 0 40 40">
    <path
      clipRule="evenodd"
      d="M30 28H10V24H30V28Z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M30 16H10V12H30V16Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </SvgIcon>
);

export default Order;
