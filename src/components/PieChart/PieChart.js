import { Box, Grid } from '@material-ui/core';
import { ResponsivePie } from '@nivo/pie';
import useResponsive from '@utils/hooks/useResponsive';
import PropTypes from 'prop-types';
import React from 'react';
import color from '../../styles/color';
import ChartLegend from '../ChartLegend';
import Loading from '../Loading';
import Typography from '../Typography';
import useStyles, { theme } from './styles';

const PieChart = (props) => {
  const { data, legends, height, indexBy, loading, ...otherProps } = props;

  const justifyContentByData = data?.length < 5 ? 'center' : 'left';
  const classes = useStyles({ height, justifyContentByData, loading });

  const isSmallClient = useResponsive('sm');

  return (
    <div className={classes.root}>
      {data?.length ? (
        <>
          <div className={classes.chartContainer}>
            <ResponsivePie
              animate={false}
              arcLabelsSkipAngle={12}
              arcLabelsTextColor={color.white}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLinkLabelsSkipAngle={12}
              arcLinkLabelsThickness={4}
              colors={({ data: { color } }) => color}
              cornerRadius={8}
              data={data}
              enableArcLinkLabels={!isSmallClient}
              id={indexBy}
              innerRadius={0.55}
              isInteractive
              margin={{
                bottom: isSmallClient ? 0 : 40,
                left: isSmallClient ? 0 : 120,
                right: isSmallClient ? 0 : 120,
                top: isSmallClient ? 0 : 40,
              }}
              // sortByValue
              startAngle={-90}
              theme={theme}
              {...otherProps}
            />
          </div>
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
                      <ChartLegend children={label} color={d.color} />
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

PieChart.defaultProps = {
  data: [],
  height: 300,
  indexBy: 'label',
  legends: true,
  loading: false,
};

PieChart.propTypes = {
  data: PropTypes.array,
  height: PropTypes.number,
  indexBy: PropTypes.string,
  legends: PropTypes.bool,
  loading: PropTypes.bool,
};

export default PieChart;
