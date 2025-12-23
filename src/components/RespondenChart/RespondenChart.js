import React from 'react';
import PropTypes from 'prop-types';
import color from '../../styles/color';
import BarChart from '../BarChart';
import ChartLegend from '../ChartLegend';
import useStyles from './styles';
import Loading from '../Loading';
import Typography from '../Typography';
import { Box } from '@material-ui/core';

const RespondenChart = (props) => {
  const data = props.data.map((d, i) => {
    let barColor = color.primary.main;
    if (i < 7) {
      barColor = color.primary.main;
    } else if (i < 9) {
      barColor = color.yellow.main;
    } else {
      barColor = color.green.main;
    }

    return {
      ...d,
      color: barColor,
    };
  });

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.chartContainer}>
        {data.length ? (
          <BarChart
            animate={false}
            axisLeft={{
              format: (e) => Math.floor(e) === e && e,
            }}
            colors={({ data: { color } }) => color}
            data={data}
            indexBy={props.indexBy}
            isInteractive
            layout="vertical"
            leftLabel="COUNT"
            tooltipLabel={({ index }) => `Total Nilai ${index}`}
          />
        ) : (
          <div className={classes.notFoundContainer}>
            <Typography
              children="Chart Not Found"
              color="general-mid"
              variant="body2"
            />
          </div>
        )}
        <div className={classes.loadingOverlay}>
          <Loading color="primary" size="large" />
          <Box mt={1}>
            <Typography children="Generating Chart" variant="body2" />
          </Box>
        </div>
      </div>
      <div className={classes.legendContainer}>
        <ChartLegend children="Detractors" color={color.primary.main} />
        <ChartLegend children="Passive" color={color.yellow.main} />
        <ChartLegend children="Promoters" color={color.green.main} />
      </div>
    </div>
  );
};

RespondenChart.defaultProps = {
  data: [],
  indexBy: 'score',
  loading: false,
};

RespondenChart.propTypes = {
  data: PropTypes.array,
  indexBy: PropTypes.string,
  loading: PropTypes.bool,
};

export default RespondenChart;
