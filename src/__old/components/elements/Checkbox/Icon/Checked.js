import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function Checked(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <rect
        fill="white"
        height="14"
        rx="1"
        stroke="#3B525C"
        strokeWidth="2"
        width="14"
        x="1"
        y="1"
      />
      <rect fill="#3B525C" height="8" rx="2" width="8" x="4" y="4" />
    </SvgIcon>
  );
}
