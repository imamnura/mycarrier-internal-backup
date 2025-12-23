/* eslint-disable react/prop-types */
import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function Minus(props) {
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
      <path
        clipRule="evenodd"
        d="M20.915 10.7275H3.08203C2.7443 10.7275 2.42039 10.8617 2.18158 11.1005C1.94276 11.3393 1.80859 11.6632 1.80859 12.001C1.80859 12.3387 1.94276 12.6626 2.18158 12.9014C2.42039 13.1403 2.7443 13.2744 3.08203 13.2744H20.915C21.2528 13.2744 21.5767 13.1403 21.8155 12.9014C22.0543 12.6626 22.1885 12.3387 22.1885 12.001C22.1885 11.6632 22.0543 11.3393 21.8155 11.1005C21.5767 10.8617 21.2528 10.7275 20.915 10.7275Z"
        fill="white"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}
