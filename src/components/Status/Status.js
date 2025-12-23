import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Typography';
import useStyles from './styles';

const Status = (props) => {
  const { children, size, variant, rounded } = props;

  const classes = useStyles({ variant, size, rounded });

  const typoColor = {
    primary: 'blue-main',
    success: 'green-main',
    alert: 'orange-main',
    danger: 'primary-main',
    warning: 'yellow-main',
    tag: 'grey-main',
    purple: 'purple-main',
    orange: 'orange-main',
  }[variant];

  const typoSize = {
    large: {
      variant: 'h5',
      weight: 'medium',
    },
    medium: {
      variant: 'subtitle2',
      weight: 'medium',
    },
    small: {
      variant: 'caption',
      weight: 'bold',
    },
  }[size];

  return (
    <div className={classes.root}>
      <Typography {...typoSize} children={children} color={typoColor} />
    </div>
  );
};

Status.defaultProps = {
  children: '',
  size: 'small',
  variant: 'tag',
  rounded: false,
};

Status.propTypes = {
  children: PropTypes.string,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf([
    'primary',
    'success',
    'alert',
    'danger',
    'warning',
    'tag',
    'purple',
  ]),
};

export default Status;
