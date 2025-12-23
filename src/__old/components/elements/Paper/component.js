import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';

const Component = (props) => {
  const { classes, children, className, ...rest } = props;

  return (
    <Paper className={clsx(classes.root, className)} elevation={0} {...rest}>
      {children}
    </Paper>
  );
};

Component.defaultProps = {
  children: null,
  classes: {},
  className: '',
};

Component.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default Component;
