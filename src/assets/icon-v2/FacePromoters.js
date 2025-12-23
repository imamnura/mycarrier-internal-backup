import { SvgIcon } from '@material-ui/core';
import React from 'react';

const FacePromoters = (props) => (
  <SvgIcon
    {...props}
    style={{ ...props.style, fill: 'none' }}
    viewBox="0 0 40 40"
  >
    <path
      d="M20.0002 37.1654C29.2049 37.1654 36.6668 29.7034 36.6668 20.4987C36.6668 11.294 29.2049 3.83203 20.0002 3.83203C10.7954 3.83203 3.3335 11.294 3.3335 20.4987C3.3335 29.7034 10.7954 37.1654 20.0002 37.1654Z"
      stroke="#12B76A"
      strokeWidth="4.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3335 23.832C13.3335 23.832 15.8335 27.1654 20.0002 27.1654C24.1668 27.1654 26.6668 23.832 26.6668 23.832"
      stroke="#12B76A"
      strokeWidth="4.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 15.5H15.0167"
      stroke="#12B76A"
      strokeWidth="4.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25 15.5H25.0167"
      stroke="#12B76A"
      strokeWidth="4.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);

export default FacePromoters;
