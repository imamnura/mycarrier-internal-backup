import React from 'react';
import PropTypes from 'prop-types';
import { Chip as MuiChip } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

/**
 *
 * @typedef {import('@material-ui/core').ChipProps} ChipProps -n
 *
 * @param {ChipProps} props -n
 * @returns {React.FC} -n
 */

const Chip = (props) => {
  const { background, className, color, colorIcon, weight, ...otherProps } =
    props;

  const classes = useStyles({
    background,
    color,
    colorIcon,
    weight,
  });

  return <MuiChip {...otherProps} className={clsx(classes.root, className)} />;
};

Chip.defaultProps = {
  background: 'primary-main',
  className: '',
  color: 'white',
  colorIcon: 'default',
  weight: 'medium',
};

Chip.propTypes = {
  background: PropTypes.oneOf([
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
  colorIcon: PropTypes.oneOf(['default', 'red', 'white']),
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'bold']),
};

export default Chip;
