import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
import color from '../../styles/color';
import PropTypes from 'prop-types';
import useStyles, { theme } from './styles';
import Typography from '../Typography';

/**
 * @description for bar chart props information
 *
 * @typedef {import('@nivo/bar').BarCommonProps} BarProps -n
 *
 * @param {BarProps} props -n
 * @returns {React.FC} -n
 */

const BarChart = (props) => {
  const { layout, leftLabel, axisLeft: _axisLeft, data, ...otherProps } = props;

  const isHorizontal = layout === 'horizontal';

  const classes = useStyles();

  const axisLeft = !_axisLeft
    ? _axisLeft
    : {
        ..._axisLeft,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      };

  return (
    <div className={classes.root}>
      {!!leftLabel && !!data?.length && (
        <Typography
          children={leftLabel}
          className={classes.leftLabel}
          variant="subtitle2"
          weight="medium"
        />
      )}
      <div className={classes.chart}>
        <ResponsiveBar
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={axisLeft}
          data={data}
          enableGridX={isHorizontal}
          enableGridY={!isHorizontal}
          isInteractive={false}
          labelSkipHeight={16}
          labelSkipWidth={16}
          labelTextColor={color.white}
          layout={layout}
          legends={[]}
          margin={{ top: 40, right: 0, bottom: 40, left: 40 }}
          padding={0.5}
          theme={theme}
          {...otherProps}
        />
      </div>
    </div>
  );
};

BarChart.defaultProps = {
  axisLeft: {},
  data: [],
  layout: 'vertical',
  leftLabel: '',
};

BarChart.propTypes = {
  axisLeft: PropTypes.object,
  data: PropTypes.array,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  leftLabel: PropTypes.string,
};

export default BarChart;
