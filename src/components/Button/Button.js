import React from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonLegion, Text } from '@legion-ui/core';
import useButtonStyles from './Button.styles';

const Button = (props) => {
  const {
    children,
    disabled,
    leftIcon: LeftIcon,
    loading,
    ml,
    mr,
    onClick: _onClick,
    rightIcon: RightIcon,
    variant: _variant,
    textTransform,
    rounded,
    ...otherProps
  } = props;

  const variant =
    {
      filled: 'solid',
      ghost: 'outline',
      secondary: 'transparent',
    }[_variant] || _variant;

  const onClick = (e) => {
    if (!loading) {
      _onClick(e);
    }
  };

  const classes = useButtonStyles({ ml, mr, textTransform, rounded });

  const iconLeft = LeftIcon && <LeftIcon className={classes.icon} />;
  const iconRight = RightIcon && <RightIcon className={classes.icon} />;

  return (
    <ButtonLegion
      {...otherProps}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      loadingPlacement="start"
      iconLeft={iconLeft || undefined}
      iconRight={iconRight || undefined}
      className={classes.button}
      loadingText={
        children ? (
          <Text size="14px" weight="700" className={classes.label}>
            Please wait...
          </Text>
        ) : null
      }
      children={
        children ? (
          <Text size="14px" weight="700" className={classes.label}>
            {children}
          </Text>
        ) : null
      }
    ></ButtonLegion>
  );
};

Button.defaultProps = {
  children: '',
  disabled: false,
  leftIcon: null,
  loading: false,
  ml: 0,
  mr: 0,
  onClick: () => {},
  rightIcon: null,
  variant: 'filled',
  textTransform: 'uppercase',
  rounded: 'normal',
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disabled: PropTypes.bool,
  leftIcon: PropTypes.func,
  loading: PropTypes.bool,
  ml: PropTypes.number,
  mr: PropTypes.number,
  onClick: PropTypes.func,
  rightIcon: PropTypes.func,
  variant: PropTypes.oneOf(['filled', 'ghost', 'secondary']),
  rounded: PropTypes.oneOf(['full', 'normal']),
  textTransform: PropTypes.string,
};

export default Button;
