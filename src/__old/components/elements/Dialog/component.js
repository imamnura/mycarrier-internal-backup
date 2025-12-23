import React from 'react';
import classNames from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import { Close as CloseIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { DialogContent } from '@material-ui/core';
import { noop } from '../../../utils/common';

const Component = (props) => {
  const {
    open,
    maxWidth,
    children,
    classes,
    onClose,
    customWidth,
    disableClose,
    ...rest
  } = props;

  const customProps = maxWidth ? { maxWidth: maxWidth } : {};

  const closeIcon = !disableClose && (
    <CloseIcon className={classes.closeIcon} onClick={onClose} />
  );

  return (
    <Dialog
      classes={{
        paperFullWidth: classNames(classes.fullwidth, {
          [customWidth]: !maxWidth && customWidth,
        }),
      }}
      fullWidth={true}
      open={open}
      scroll="body"
      {...customProps}
      {...rest}
    >
      {closeIcon}
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

Component.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  classes: PropTypes.object,
  className: PropTypes.string,
  customWidth: PropTypes.string,
  disableClose: PropTypes.bool,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

Component.defaultProps = {
  children: undefined,
  classes: {},
  className: '',
  customWidth: '',
  disableClose: false,
  maxWidth: 'sm',
  onClose: noop,
  open: false,
};

export default Component;
