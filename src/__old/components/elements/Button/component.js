import React from 'react';
import PropTypes, { oneOfType, oneOf } from 'prop-types';
import { ButtonBase, CircularProgress } from '@material-ui/core';
import Text from '../Text';
import clsx from 'clsx';
import { noop } from '../../../utils/common';

const Component = (props) => {
  const {
    classes,
    children,
    variant,
    size,
    fullWidth,
    isLoading,
    onClick,
    ...rest
  } = props;
  return (
    <ButtonBase
      {...rest}
      classes={{
        root: clsx(classes[variant], classes[`${size}Size`], {
          [classes.fullWidth]: fullWidth,
        }),
        disabled: classes[`${variant}Disabled`],
      }}
      onClick={isLoading ? noop : onClick}
    >
      <Text className={isLoading ? classes.label : ''} noColor variant="button">
        {children}
      </Text>
      {isLoading && (
        <CircularProgress
          className={classes[`${variant}Loading`]}
          size={18}
          thickness={4}
        />
      )}
    </ButtonBase>
  );
};

Component.defaultProps = {
  fullWidth: false,
  isLoading: false,
  size: 'default',
  variant: 'primary',
};

Component.propTypes = {
  children: oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  classes: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  variant: oneOf(['primary', 'secondary', 'ghost']),
};

export default Component;
