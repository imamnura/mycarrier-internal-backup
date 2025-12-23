import { SvgIcon } from '@material-ui/core';
import React from 'react';

const CircleWarning = (props) => (
  <SvgIcon {...props} color="inherit" viewBox="0 0 40 40">
    <circle cx="20" cy="20" fill="currentColor" r="20" />
    <path
      clipRule="evenodd"
      d="M34.8597 17.8789H5.13803C4.57513 17.8789 4.03529 18.1025 3.63726 18.5005C3.23923 18.8986 3.01563 19.4384 3.01562 20.0013C3.01562 20.5642 3.23923 21.104 3.63726 21.5021C4.03529 21.9001 4.57513 22.1237 5.13803 22.1237H34.8597C35.4226 22.1237 35.9624 21.9001 36.3605 21.5021C36.7585 21.104 36.9821 20.5642 36.9821 20.0013C36.9821 19.4384 36.7585 18.8986 36.3605 18.5005C35.9624 18.1025 35.4226 17.8789 34.8597 17.8789Z"
      fill="white"
      fillRule="evenodd"
    />
  </SvgIcon>
);

export default CircleWarning;
