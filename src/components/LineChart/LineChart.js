import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import useStyles, { theme } from './styles';
import { Box, Grid } from '@material-ui/core';
import ChartLegend from '@components/ChartLegend';
import Typography from '@components/Typography';
import Loading from '@components/Loading';
import useResponsive from '@utils/hooks/useResponsive';
import { getMaxY } from './utils';

const LineChart = (props) => {
  const {
    indexBy,
    leftLabel,
    data,
    legends,
    loading,
    enablePoints,
    enableGridX,
    noBottom,
    noScroll,
    height,
  } = props;

  const classes = useStyles({ loading, height });

  const isSmallClient = useResponsive('sm');

  const dataLength = data[0]?.data?.length;
  const longData = dataLength > (isSmallClient ? 7 : 10);

  return (
    <div className={classes.root}>
      {data?.length ? (
        <>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              pb: 2,
              overflowX: longData && !noScroll ? 'auto' : 'hidden',
              overflowY: 'hidden',
            }}
          >
            <Box
              className={classes.chartContainer}
              sx={{
                width: longData && !noScroll ? dataLength * 60 : '100%',
              }}
            >
              {!!leftLabel && !!data?.length && (
                <Typography
                  children={leftLabel}
                  className={classes.leftLabel}
                  variant="subtitle2"
                  weight="medium"
                />
              )}
              <ResponsiveLine
                axisBottom={
                  !noBottom && {
                    tickSize: 5,
                    tickPadding: 8,
                    tickRotation: dataLength > 10 ? -25 : 0,
                  }
                }
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 8,
                  tickValues: 5,
                }}
                colors={data.map(({ color }) => color)}
                data={data}
                enableGridX={enableGridX}
                enablePoints={enablePoints}
                gridYValues={5}
                lineWidth={2}
                margin={{
                  bottom: 40,
                  left: 40,
                  right: 96,
                  top: 40,
                }}
                pointBorderColor={{ from: 'serieColor' }}
                pointBorderWidth={2}
                pointColor="white"
                pointSize={12}
                theme={theme}
                tooltip={({
                  point: {
                    serieId,
                    data: { x, y },
                    serieColor,
                  },
                }) => (
                  <div className={classes.tooltip}>
                    <Box
                      sx={{
                        height: 2,
                        width: 16,
                        backgroundColor: serieColor,
                        marginRight: 8,
                      }}
                    />
                    {serieId} - {x}: {y}
                  </div>
                )}
                useMesh
                yScale={{
                  type: 'linear',
                  max: getMaxY(data),
                  // max: 3,
                  stacked: false,
                  reverse: false,
                }}
              />
            </Box>
          </Box>
          {legends && (
            <div className={classes.legendContainer}>
              <Grid
                alignItems="center"
                container
                justifyContent="center"
                spacing={2}
              >
                {data.map((d) => {
                  const label = d[indexBy];
                  return (
                    <Grid item key={label} sm="auto" xs={6}>
                      <ChartLegend
                        children={label}
                        color={d.color}
                        variant="line"
                      />
                    </Grid>
                  );
                })}
                {data.length % 2 === 1 && <Grid item sm="auto" xs={6} />}
              </Grid>
            </div>
          )}
        </>
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
        <Box ml={2}>
          <Typography children="Generating Chart" variant="body2" />
        </Box>
      </div>
    </div>
  );
};

LineChart.defaultProps = {
  data: [],
  enableGridX: true,
  enablePoints: true,
  height: 540,
  indexBy: 'id',
  leftLabel: '',
  legends: true,
  loading: false,
  noBottom: false,
  noScroll: false,
};

LineChart.propTypes = {
  data: PropTypes.array,
  enableGridX: PropTypes.bool,
  enablePoints: PropTypes.bool,
  height: PropTypes.number,
  indexBy: PropTypes.string,
  leftLabel: PropTypes.string,
  legends: PropTypes.bool,
  loading: PropTypes.bool,
  noBottom: PropTypes.bool,
  noScroll: PropTypes.bool,
};

export default LineChart;
