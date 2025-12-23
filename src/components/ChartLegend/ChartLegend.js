import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Typography';
import useStyles from './styles';

const ChartLegend = (props) => {
  const { children, color, variant, labelProps } = props;

  const classes = useStyles({ color, variant });

  return (
    <div className={classes.root}>
      <div className={classes.box} />
      <Typography
        children={children}
        variant="caption"
        weight="bold"
        {...labelProps}
      />
    </div>
  );
};

ChartLegend.defaultProps = {
  children: '-',
  color: '#000',
  labelProps: {},
  variant: 'bar',
};

ChartLegend.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  labelProps: PropTypes.object,
  variant: PropTypes.string,
};

export default ChartLegend;
