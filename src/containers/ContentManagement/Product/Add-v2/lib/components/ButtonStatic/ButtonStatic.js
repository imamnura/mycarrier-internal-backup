import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

function Button(props) {
  const { children } = props;
  const classes = useStyles();

  return <div className={classes.button}>{children}</div>;
}

Button.defaultProps = {
  children: '',
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default Button;
