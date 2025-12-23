/* eslint-disable react/prop-types */
import React from 'react';
import { SvgIcon } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

export default function StepperIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        fill={props.color}
        r="11"
        stroke={props.color}
        strokeWidth="2"
      />
      <ClearIcon style={{ color: 'white' }} />
    </SvgIcon>
  );
}
