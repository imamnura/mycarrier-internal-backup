import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';

const Component = (props) => {
  const { classes, type } = props;

  return <Divider className={classes[`divider${type}`]} />;
};

Component.defaultProps = {
  type: 'default',
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['dark', 'default']),
};

export default Component;
