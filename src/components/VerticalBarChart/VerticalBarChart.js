import React from 'react';
import PropTypes from 'prop-types';
import BarChart from '../BarChart';
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import ChartLegend from '@components/ChartLegend';

const VerticalBarChart = (props) => {
  const { leftLabel, indexBy, legends, data, height, ...otherProps } = props;

  const classes = useStyles({ height });

  return (
    <>
      <div className={classes.root}>
        <BarChart
          padding={data.length / (data.length + 1.2)}
          {...otherProps}
          data={data}
          indexBy={indexBy}
          layout="vertical"
          leftLabel={leftLabel}
        />
      </div>
      {legends?.length && (
        <div className={classes.legendContainer}>
          <Grid container justifyContent="center" spacing={2}>
            {legends.map(({ color, label, variant }) => (
              <Grid item key={label} sm="auto" xs={6}>
                <ChartLegend
                  children={label}
                  color={color}
                  variant={variant || 'line'}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

VerticalBarChart.defaultProps = {
  data: [],
  height: 540,
  indexBy: 'label',
  leftLabel: '',
  legends: [],
};

VerticalBarChart.propTypes = {
  data: PropTypes.array,
  height: PropTypes.number,
  indexBy: PropTypes.string,
  leftLabel: PropTypes.string,
  legends: PropTypes.array,
};

export default VerticalBarChart;
