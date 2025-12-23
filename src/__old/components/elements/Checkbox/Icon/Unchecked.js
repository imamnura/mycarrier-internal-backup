import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function Checked(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <rect
        fill="white"
        height="14"
        rx="1"
        stroke="#78858B"
        strokeWidth="2"
        width="14"
        x="1"
        y="1"
      />
    </SvgIcon>
  );
}
