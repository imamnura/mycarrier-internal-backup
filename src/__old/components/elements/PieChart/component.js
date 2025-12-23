import React from 'react';
import PropTypes from 'prop-types';
import { ResponsivePie } from '@nivo/pie';
import NoData from '../../../../assets/Svg/NoData';
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
};

const Component = (props) => {
  const { classes, data, label, percent } = props;

  const mobileClient = useMediaQuery(useTheme().breakpoints.down('xs'));

  const barWidth = mobileClient ? '100%' : '60%';

  const colors = [];

  data.map(({ color }) => {
    colors.push(color);
  });

  const getValueFormat = (v) => {
    if (percent) return `${v}%`;
    else return v;
  };

  return (
    <div
      className={classes.container}
      style={{ alignItems: data.length > 20 ? 'start' : 'center' }}
    >
      <div style={{ height: 500, width: barWidth }}>
        {data.length < 1 ? (
          <div className={classes.emptyData}>
            <NoData />
            <div className={classes.emptyContainer}>
              <Text variant="h5">
                None of your datas matched for this search. Try another search.
              </Text>
            </div>
          </div>
        ) : (
          <ResponsivePie
            activeOuterRadiusOffset={8}
            animate={true}
            borderColor={{ from: 'color' }}
            borderWidth={1}
            colors={colors}
            cornerRadius={5}
            data={data}
            innerRadius={0.5}
            margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
            radialLabel="label"
            radialLabelsLinkColor={{ from: 'color' }}
            radialLabelsLinkStrokeWidth={3}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#FFF"
            theme={theme}
            valueFormat={(v) => getValueFormat(v)}
          />
        )}
      </div>
      <div style={{ width: mobileClient ? '100%' : '40%' }}>
        <div
          style={{
            width: '100%',
            textAlign: mobileClient ? 'center' : 'left',
            margin: mobileClient ? '0 0 8px 0' : '8px 0 8px 16px',
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <Text variant="caption">DATA ON</Text>
          <Text variant="h5">{label}</Text>
        </div>
        <Grid
          container
          direction={mobileClient ? 'row' : 'column'}
          justify={mobileClient ? 'center' : 'left'}
        >
          {data.map(({ label, color }, index) => (
            <Grid className={classes.rootLegend} item key={`${index}-${label}`}>
              <div
                className={classes.legendBox}
                style={{ backgroundColor: color }}
              />
              <Text variant="captionBold">{label}</Text>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.array,
  label: PropTypes.string,
  percent: PropTypes.bool,
};

Component.defaultProps = {
  classes: {},
  data: [],
  label: '',
  percent: false,
};

export default Component;
