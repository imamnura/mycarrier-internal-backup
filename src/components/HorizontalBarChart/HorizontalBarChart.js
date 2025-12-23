import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import color from '../../styles/color';
import BarChart from '../BarChart';
import Typography from '../Typography';
import useStyles from './styles';
import Loading from '../Loading';
import { Box } from '@material-ui/core';
import { Flex, Text } from '@legion-ui/core';
import Tooltip from '@components/Tooltip/Tooltip';
import { textLimit } from '@utils/text';
import StateMessage from '@components/StateMessage/StateMessage';
import NoData from '@assets/ilustration-v2/NoData';

export const _tooltipLabel = ({ indexValue }) => indexValue;

const HorizontalBarChart = (props) => {
  const {
    leftLabel,
    indexBy,
    data,
    colors,
    loading: load,
    tooltipLabel,
    maxLabel,
    categorizeIndicator,
    maxLeftMargin,
    tooltipTitleLimit = false,
    ...otherProps
  } = props;

  const [loading, setLoading] = useState(load);

  useEffect(() => {
    if (load) {
      setLoading(load);
    } else {
      setTimeout(() => {
        setLoading(load);
      }, 200);
    }
  }, [load]);

  const marginLeftChart = () => {
    let longestLabel = 0;

    props.data.forEach((d) => {
      const label = categorizeIndicator
        ? d[indexBy]?.split(categorizeIndicator)[0]
        : d[indexBy];
      let keyNameLength = label?.length || 0;

      if (maxLabel) {
        keyNameLength = textLimit(label, maxLabel)?.length || 0;
      }

      if (longestLabel < keyNameLength) {
        longestLabel = keyNameLength;
      }
    });

    const res = longestLabel * 9;

    if (!maxLeftMargin) {
      return res;
    } else {
      return res < maxLeftMargin ? res : maxLeftMargin;
    }
  };

  const classes = useStyles({ ...props, loading, categorizeIndicator });

  // Helper to trim label if more than 25 chars
  const trimLabel = (label) => {
    if (!label) return '';
    return label.length > 25 ? label.slice(0, 25) + '... ' : label;
  };

  return (
    <div className={classes.root}>
      <Text
        children={leftLabel}
        className={classes.leftLabel}
        variant="subtitle2"
        weight="600"
      />
      <div className={classes.chartContainer}>
        {data?.length ? (
          <>
            <div className={classes.barContainer}>
              <div className={classes.chart}>
                <BarChart
                  {...otherProps}
                  animate={false}
                  colors={colors}
                  data={data}
                  indexBy={indexBy}
                  isInteractive
                  layout="horizontal"
                  padding={categorizeIndicator ? 0.6 : 0.5}
                  margin={{
                    right: 8,
                    top: 20,
                    bottom: data.length > 5 ? 0 : 32,
                    left: marginLeftChart(),
                  }}
                  tooltipLabel={
                    categorizeIndicator
                      ? ({ indexValue }) =>
                          tooltipTitleLimit
                            ? trimLabel(
                                indexValue?.split(categorizeIndicator)[0],
                              )
                            : indexValue?.split(categorizeIndicator)[0]
                      : tooltipLabel
                  }
                  axisLeft={{
                    renderTick:
                      maxLabel || categorizeIndicator
                        ? ({
                            opacity,
                            textAnchor,
                            textBaseline,
                            lineX,
                            lineY,
                            textX,
                            textY,
                            theme,
                            value,
                            x,
                            y,
                          }) => {
                            const splittedLabel = value.split('_');
                            const label = splittedLabel[0];
                            const journey = splittedLabel[1];
                            return (
                              <g
                                transform={`translate(${x},${y})`}
                                style={{ opacity }}
                              >
                                <line
                                  x1={lineX}
                                  x2={0}
                                  y1={lineY}
                                  y2={0}
                                  style={{
                                    stroke: 'rgb(119, 119, 119)',
                                    strokeWidth: 1,
                                  }}
                                />
                                <Tooltip title={label}>
                                  <g>
                                    {journey && (
                                      <text
                                        alignmentBaseline={textBaseline}
                                        style={{
                                          fontWeight: 600,
                                          fill: '#87959B',
                                        }}
                                        textAnchor={textAnchor}
                                        transform={`translate(${textX},${
                                          textY - 10
                                        })`}
                                      >
                                        {journey}
                                      </text>
                                    )}
                                    <text
                                      alignmentBaseline={textBaseline}
                                      style={theme?.axis?.ticks?.text}
                                      textAnchor={textAnchor}
                                      transform={`translate(${textX},${
                                        textY + (journey ? 8 : 0)
                                      })`}
                                    >
                                      {textLimit(label, maxLabel)}
                                    </text>
                                  </g>
                                </Tooltip>
                              </g>
                            );
                          }
                        : undefined,
                  }}
                />
              </div>
            </div>
            {data.length > 5 && (
              <div className={classes.axes}>
                <BarChart
                  {...otherProps}
                  animate={false}
                  axisLeft={null}
                  colors={colors}
                  data={data}
                  indexBy={indexBy}
                  layers={['axes']}
                  layout="horizontal"
                  margin={{
                    right: 8,
                    top: 0,
                    bottom: 40,
                    left: marginLeftChart(),
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className={classes.notFoundContainer}>
            <Flex height="240px" alignX="center" alignY="center">
              <StateMessage
                description="Data Not Found"
                size="small"
                ilustration={NoData}
              />
            </Flex>
          </div>
        )}
        <div className={classes.loadingOverlay}>
          <Loading color="primary" size="large" />
          <Box ml={2}>
            <Typography children="Generating Chart" variant="body2" />
          </Box>
        </div>
      </div>
    </div>
  );
};

HorizontalBarChart.defaultProps = {
  colors: color.blue.main,
  data: [],
  indexBy: 'label',
  leftLabel: '',
  loading: false,
  tooltipLabel: _tooltipLabel,
};

HorizontalBarChart.propTypes = {
  colors: PropTypes.string,
  data: PropTypes.array,
  indexBy: PropTypes.string,
  leftLabel: PropTypes.string,
  loading: PropTypes.bool,
  tooltipLabel: PropTypes.func,
};

export default HorizontalBarChart;
