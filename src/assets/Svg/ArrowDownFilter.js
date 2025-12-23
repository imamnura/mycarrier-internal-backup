import React from 'react';
import { SvgIcon } from '@material-ui/core';

export default function ArrowDownFilter(props) {
  return (
    <SvgIcon {...props} style={{ fontSize: 10 }} viewBox="0 0 8 4">
      <path
        clipRule="evenodd"
        d="M7.25426 0.24407C7.08959 0.0814036 6.82226 0.0814036 6.65726 0.24407L3.99959 2.86974L1.34193 0.24407C1.17693 0.0814036 0.909594 0.0814036 0.744594 0.24407C0.579927 0.40707 0.579927 0.67107 0.744594 0.83407L3.70093 3.75474C3.86559 3.9174 4.13293 3.9174 4.29793 3.75474L7.25393 0.83407C7.33659 0.752737 7.37793 0.64607 7.37793 0.53907C7.37793 0.43207 7.33693 0.325737 7.25426 0.24407Z"
        fill="#3B525C"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
}
