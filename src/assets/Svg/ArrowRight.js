import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function ArrowRight(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 6 10">
      <path
        clipRule="evenodd"
        d="M5.24272 4.40344L1.92672 1.03411C1.60339 0.704776 1.07872 0.704776 0.754719 1.03411C0.430719 1.36278 0.430719 1.89611 0.754719 2.22478L3.48405 4.99878L0.754719 7.77211C0.430719 8.10144 0.430719 8.63411 0.754719 8.96344C0.916052 9.12744 1.12872 9.21011 1.34072 9.21011C1.55272 9.21011 1.76539 9.12744 1.92672 8.96344L5.24272 5.59344C5.56739 5.26544 5.56739 4.73278 5.24272 4.40344Z"
        fill="#3B525C"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}
