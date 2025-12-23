import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function Pencil(props) {
  return (
    <SvgIcon
      {...props}
      style={{ fill: 'none', width: 20, height: 20 }}
      viewBox="0 0 22 22"
    >
      <g clip-path="url(#clip0_49945_2411)">
        <path
          d="M14.1641 2.49895C14.3829 2.28008 14.6428 2.10646 14.9287 1.98801C15.2147 1.86956 15.5212 1.80859 15.8307 1.80859C16.1403 1.80859 16.4468 1.86956 16.7327 1.98801C17.0187 2.10646 17.2785 2.28008 17.4974 2.49895C17.7163 2.71782 17.8899 2.97766 18.0083 3.26362C18.1268 3.54959 18.1878 3.85609 18.1878 4.16562C18.1878 4.47515 18.1268 4.78164 18.0083 5.06761C17.8899 5.35358 17.7163 5.61341 17.4974 5.83228L6.2474 17.0823L1.66406 18.3323L2.91406 13.749L14.1641 2.49895Z"
          stroke="#F79009"
          stroke-width="1.67"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_49945_2411">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(-0.00390625)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
