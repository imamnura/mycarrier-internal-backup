import { SvgIcon } from '@material-ui/core';
import React from 'react';

const FileOther = (props) => (
  <SvgIcon {...props} color="inherit" viewBox="0 0 40 40">
    <path
      d="M10 0C8.625 0 7.5 1.125 7.5 2.5V37.5C7.5 38.875 8.625 40 10 40H35C36.375 40 37.5 38.875 37.5 37.5V10L27.5 0H10Z"
      fill="#E2E5E7"
    />
    <path
      d="M30 10H37.5L27.5 0V7.5C27.5 8.875 28.625 10 30 10Z"
      fill="#B0B7BD"
    />
    <path d="M37.5 17.5L30 10H37.5V17.5Z" fill="#CAD1D8" />
    <path
      d="M32.5 32.5C32.5 33.1875 31.9375 33.75 31.25 33.75H3.75C3.0625 33.75 2.5 33.1875 2.5 32.5V20C2.5 19.3125 3.0625 18.75 3.75 18.75H31.25C31.9375 18.75 32.5 19.3125 32.5 20V32.5Z"
      fill="#B0B7BD"
    />
    <path
      d="M31.25 33.75H7.5V35H31.25C31.9375 35 32.5 34.4375 32.5 33.75V32.5C32.5 33.1875 31.9375 33.75 31.25 33.75Z"
      fill="#CAD1D8"
    />
  </SvgIcon>
);

export default FileOther;
