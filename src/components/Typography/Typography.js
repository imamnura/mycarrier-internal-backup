import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import clsx from 'clsx';

const Typography = (props) => {
  const { children, className, color, inline, variant, weight, ...otherProps } =
    props;

  const classes = useStyles({
    color,
    inline,
    variant,
    weight,
  });

  return (
    <span {...otherProps} className={clsx(classes.root, className)}>
      {children}
    </span>
  );
};

Typography.defaultProps = {
  children: '',
  className: '',
  color: 'inherit',
  inline: false,
  variant: 'subtitle2',
  weight: 'normal',
};

Typography.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'inherit',
    'primary-dark',
    'primary-main',
    'primary-mid',
    'primary-light',
    'primary-soft',
    'general-dark',
    'general-main',
    'general-mid',
    'general-light',
    'general-soft',
    'general-general',
    'black',
    'white',
    'blue-main',
    'blue-soft',
    'yellow-main',
    'yellow-soft',
    'purple-main',
    'purple-soft',
    'orange-main',
    'orange-soft',
    'green-main',
    'green-soft',
    'grey-main',
    'grey-soft',
  ]),
  inline: PropTypes.bool,
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'overline',
    'buttonL',
    'buttonM',
    'buttonS',
  ]),
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'bold', 'inherit']),
};

export default Typography;
