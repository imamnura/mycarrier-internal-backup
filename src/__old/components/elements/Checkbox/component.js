import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Checked from './Icon/Checked';
import Uncheked from './Icon/Unchecked';
import Indeterminate from './Icon/Indeterminate';

export default function CustomCheckbox(props) {
  return (
    <Checkbox
      checkedIcon={<Checked />}
      color="inherit"
      icon={<Uncheked />}
      indeterminateIcon={<Indeterminate />}
      size="small"
      {...props}
    />
  );
}
