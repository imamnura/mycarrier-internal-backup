import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function FilePlus(props) {
  return (
    <SvgIcon style={{ color: 'white' }} {...props} viewBox="0 0 40 40">
      <path
        d="M23.3337 3.33398H10.0003C9.11627 3.33398 8.26842 3.68517 7.6433 4.31029C7.01818 4.93542 6.66699 5.78326 6.66699 6.66732V33.334C6.66699 34.218 7.01818 35.0659 7.6433 35.691C8.26842 36.3161 9.11627 36.6673 10.0003 36.6673H30.0003C30.8844 36.6673 31.7322 36.3161 32.3573 35.691C32.9825 35.0659 33.3337 34.218 33.3337 33.334V13.334L23.3337 3.33398Z"
        stroke={props.fill || '#2F424A'}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.333 3.33398V13.334H33.333"
        stroke={props.fill || '#2F424A'}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 30V20"
        stroke={props.fill || '#2F424A'}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 25H25"
        stroke={props.fill || '#2F424A'}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
