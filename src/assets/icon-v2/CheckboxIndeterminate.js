import { SvgIcon } from '@material-ui/core';
import React from 'react';

const CheckboxIndeterminate = (props) => (
  <SvgIcon
    {...props}
    color="inherit"
    height="16"
    viewBox="0 0 16 16"
    width="16"
  >
    <rect
      fill="white"
      height="14"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
      width="14"
      x="1"
      y="1"
    />
    <rect fill="currentColor" height="2" rx="1" width="8" x="4" y="7" />
  </SvgIcon>
);

export default CheckboxIndeterminate;
