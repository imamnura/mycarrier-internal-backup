import React from 'react';
// import { Checkbox as BaseCheckbox } from '@material-ui/core';
import { Checkbox as BaseCheckbox } from '@legion-ui/core';
import CheckboxChecked from '@assets/icon-v2/CheckboxChecked';
import CheckboxIndeterminate from '@assets/icon-v2/CheckboxIndeterminate';
import CheckboxIdle from '@assets/icon-v2/CheckboxIdle';
import useStyles from './styles';

/**
 *
 * @typedef {import('@material-ui/core').CheckboxProps} CheckboxProps -n
 *
 * @param {CheckboxProps} props -n
 * @returns {React.FC} -n
 */

const Checkbox = React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <BaseCheckbox
      {...props}
      checkedIcon={<CheckboxChecked className={classes.icon} />}
      classes={{
        root: classes.root,
        checked: classes.main,
        disabled: classes.disabled,
        indeterminate: classes.main,
      }}
      disableRipple
      icon={<CheckboxIdle className={classes.icon} />}
      indeterminateIcon={<CheckboxIndeterminate className={classes.icon} />}
      ref={ref}
    />
  );
});

export default Checkbox;
