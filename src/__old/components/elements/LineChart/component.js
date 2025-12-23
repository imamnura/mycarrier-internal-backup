import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import Text from '../Text';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';

const theme = {
  fontFamily: 'Titillium Web',
  fontSize: 14,
  textColor: '#3B525C',
  grid: {
    line: {
      stroke: '#D2DADE',
    },
  },
  axis: {
    legend: {
      text: {
        fill: '#111E24',
        fontFamily: 'Titillium Web',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: '0.01em',
      },
    },
  },
};

const Component = (props) => {
  const { classes, keys, color, data, label } = props;

  const mobileClient = useMediaQuery(useTheme().breakpoints.down('xs'));

  const lineWidth =
    (data[0] && data[0]?.data?.length > 10) || mobileClient
      ? data[0]?.data?.length * 140
      : '100%';

  return (
    <div>
      <div style={{ overflowX: 'auto', overflowY: 'hidden', marginBottom: 16 }}>
        <div style={{ height: 500, width: lineWidth }}>
          <ResponsiveLine
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: label,
              legendPosition: 'middle',
              legendOffset: -50,
            }}
            colors={color}
            data={data}
            enableSlices="x"
            margin={{ top: 32, right: 0, bottom: 48, left: 60 }}
            pointBorderColor={{ from: 'serieColor' }}
            pointBorderWidth={2}
            pointColor="#FFF"
            pointSize={10}
            theme={theme}
            useMesh={true}
          />
        </div>
      </div>
      <Grid container direction="row-reverse" justify="center">
        {keys.map((legendLabel, index) => (
          <Grid className={classes.rootLegend} item key={legendLabel}>
            <div
              className={classes.legendBox}
              style={{ backgroundColor: color[index] }}
            />
            <Text variant="captionBold">{legendLabel}</Text>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Component.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.array.isRequired,
  data: PropTypes.array,
  keys: PropTypes.array.isRequired,
  label: PropTypes.string,
};

Component.defaultProps = {
  classes: {},
  data: [],
  label: '',
};

export default Component;
