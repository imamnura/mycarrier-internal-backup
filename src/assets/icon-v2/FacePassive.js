import { SvgIcon } from '@material-ui/core';
import React from 'react';

const FacePassive = (props) => (
  <SvgIcon
    {...props}
    style={{ ...props.style, fill: 'none' }}
    viewBox="0 0 40 40"
  >
    <path
      d="M20.0002 37.1654C29.2049 37.1654 36.6668 29.7034 36.6668 20.4987C36.6668 11.294 29.2049 3.83203 20.0002 3.83203C10.7954 3.83203 3.3335 11.294 3.3335 20.4987C3.3335 29.7034 10.7954 37.1654 20.0002 37.1654Z"
      stroke="#F79009"
      strokeWidth="4.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3335 25.5H26.6668"
      stroke="#F79009"
      strokeWidth="4.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 15.5H15.0167"
      stroke="#F79009"
      strokeWidth="4.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25 15.5H25.0167"
      stroke="#F79009"
      strokeWidth="4.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);

export default FacePassive;
