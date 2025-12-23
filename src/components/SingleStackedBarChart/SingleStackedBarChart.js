import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';

const SingleStackedBarChart = ({ data, all }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {data.map(({ color }, index) => {
        const totalValueBefore = data.reduce((a, b, c) => {
          if (c < index) {
            return a + b.value;
          } else {
            return a;
          }
        }, 0);

        const width = 100 - (totalValueBefore / all) * 100;

        return (
          <div
            className={classes.bar}
            key={color}
            style={{ background: color, width: `${width}%` }}
          />
        );
      })}
    </div>
  );
};

SingleStackedBarChart.propTypes = {
  all: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

export default SingleStackedBarChart;
