import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function Delete({ style, ...props }) {
  return (
    <SvgIcon
      {...props}
      style={{
        fill: 'none',
        stroke: '#DE1B1B',
        width: 20,
        height: 20,
        ...style,
      }}
      viewBox="0 0 22 22"
    >
      <path
        d="M2.49609 5H4.16276H17.4961"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66406 5.0013V3.33464C6.66406 2.89261 6.83966 2.46868 7.15222 2.15612C7.46478 1.84356 7.8887 1.66797 8.33073 1.66797H11.6641C12.1061 1.66797 12.53 1.84356 12.8426 2.15612C13.1551 2.46868 13.3307 2.89261 13.3307 3.33464V5.0013M15.8307 5.0013V16.668C15.8307 17.11 15.6551 17.5339 15.3426 17.8465C15.03 18.159 14.6061 18.3346 14.1641 18.3346H5.83073C5.3887 18.3346 4.96478 18.159 4.65222 17.8465C4.33966 17.5339 4.16406 17.11 4.16406 16.668V5.0013H15.8307Z"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
