import { SvgIcon } from '@material-ui/core';
import React from 'react';

const Filter = (props) => (
  <SvgIcon
    width="20"
    height="20"
    {...props}
    color="inherit"
    viewBox="0 0 20 20"
    style={{ fill: 'white' }}
  >
    <g id="Icon Left">
      <path
        id="Vector"
        d="M16.6654 4H3.33203L8.66536 10.3067V14.6667L11.332 16V10.3067L16.6654 4Z"
        stroke="#DE1B1B"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </SvgIcon>
);

export default Filter;
