import { Tooltip as BaseTooltip } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

/**
 * @description for bar chart props information
 *
 * @typedef {import('@material-ui/core').TooltipProps} TooltipProps -n
 *
 * @param {TooltipProps} props -n
 * @returns {React.FC} -n
 */

const Tooltip = (props) => {
  const classes = useStyles();

  return (
    <BaseTooltip
      classes={{
        tooltip: classes.tooltip,
        arrow: classes.arrow,
      }}
      {...props}
    />
  );
};

export default Tooltip;
