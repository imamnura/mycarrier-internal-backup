import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const Component = (props) => {
  const { classes, children, variant, color, noColor, weight, ...rest } = props;
  return (
    <Typography
      {...rest}
      className={clsx(
        classes.baseText,
        classes[variant],
        {
          [classes.inline]: rest.inline,
          [classes[`color${color}`]]: noColor === false,
          [classes[weight]]: weight,
        },
        rest.className,
      )}
      component="span"
    >
      {children}
    </Typography>
  );
};

Component.defaultProps = {
  color: 'default',
  noColor: false,
  variant: '',
  weight: '',
};

Component.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'white',
    'grey',
    'default',
    'primary',
    'blue',
    'mainDark',
    'green',
    'yellow',
  ]),
  noColor: PropTypes.bool,
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
    'button',
    'caption',
    'captionBold',
    'overline',
    'overlineMedium',
    'status',
    'subtitle1Bold',
  ]),
  weight: PropTypes.oneOf(['regular', 'medium', 'bold', '']),
};

export default Component;
