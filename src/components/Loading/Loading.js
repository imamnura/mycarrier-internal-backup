import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import useStyles from './styles';

const Loading = (props) => {
  const { color, size: _size } = props;
  const classes = useStyles({ color });

  const size = {
    large: 30,
    medium: 18,
    small: 14,
    huge: 56,
  }[_size];

  return (
    <CircularProgress
      classes={{ root: classes.root }}
      color="inherit"
      size={size}
      thickness={4}
    />
  );
};

Loading.defaultProps = {
  color: 'inherit',
  size: 'small',
};

Loading.propTypes = {
  color: PropTypes.oneOf(['primary', 'white', 'inherit', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge']),
};

export default Loading;
