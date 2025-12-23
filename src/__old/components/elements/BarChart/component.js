import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';
import Text from '../Text';
import { Grid, useTheme, useMediaQuery } from '@material-ui/core';

const theme = {
  fontFamily: 'Titillium Web',
  fontSize: 14,
  textColor: '#3B525C',
  labels: {
    text: {
      fontSize: 10,
    },
  },
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
  const { classes, keys, color, data, label, ...otherProps } = props;

  const mobileClient = useMediaQuery(useTheme().breakpoints.down('xs'));

  const barWidth = data.length > 7 || mobileClient ? data.length * 150 : '100%';

  const maxValue = {};
  keys.forEach((item) => (maxValue[item] = 0));

  data.forEach((item) => {
    keys.forEach((k) => {
      const newVal = item[k] || 0;
      if (maxValue[k] < newVal) maxValue[k] = newVal;
    });
  });

  // const normalizeColor = color.filter((item, ind) => {
  //   const key = Object.keys(maxValue);
  //   return Boolean(item) && maxValue[key[ind]];
  // });

  return (
    <div>
      <div style={{ overflowX: 'auto', overflowY: 'hidden', marginBottom: 16 }}>
        <div style={{ height: 500, width: barWidth }}>
          <ResponsiveBar
            animate={true}
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
            groupMode="grouped"
            indexBy="name"
            keys={keys}
            labelTextColor="#FFF"
            margin={{ top: 30, right: 0, bottom: 48, left: 60 }}
            motionDamping={15}
            motionStiffness={90}
            padding={0.3}
            theme={theme}
            {...otherProps}
          />
        </div>
      </div>
      <Grid container justify={mobileClient ? 'left' : 'center'}>
        {keys.map(
          (legendLabel, index) =>
            !legendLabel.includes('empty') && (
              <Grid className={classes.rootLegend} item key={legendLabel}>
                <div
                  className={classes.legendBox}
                  style={{ backgroundColor: color[index] }}
                />
                <Text variant="captionBold">{legendLabel}</Text>
              </Grid>
            ),
        )}
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
