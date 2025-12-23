import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Text from '../Text';

const Component = (props) => {
  const { classes, variant, className, label } = props;

  return (
    <div className={clsx(classes.root, className, classes[variant])}>
      <Text className={classes[variant]} variant="status">
        {label}
      </Text>
    </div>
  );
};

Component.defaultProps = {
  classes: {},
  className: '',
  label: '-',
  variant: 'grey',
};

Component.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.oneOf([
    'green',
    'grey',
    'orange',
    'darkOrange',
    'blue',
    'red',
  ]),
};

export default Component;
