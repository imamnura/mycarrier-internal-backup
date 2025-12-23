import React from 'react';
import PropTypes from 'prop-types';
import useNpsMeterStyles from './NpsMeter.styles';
import { ResponsivePie } from '@nivo/pie';
import { Text } from '@legion-ui/core';
import ArrowTriangleDown from '@assets/icon-v2/ArrowTriangleDown';
import clsx from 'clsx';
import StateMessage from '@components/StateMessage';
import NoData from '@assets/ilustration-v2/NoData';
import Skeleton from '@components/Skeleton';
import color from '@styles/color';

const NpsMeter = ({ data, loading }) => {
  const classes = useNpsMeterStyles();

  if (loading) {
    return (
      <div className={classes.container}>
        <Skeleton height="100%" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={classes.container}>
        <StateMessage
          description="Data Not Found"
          size="small"
          ilustration={NoData}
        />
      </div>
    );
  }

  const gaugeData = [
    { value: data.detractors, color: '#E44747' },
    { value: data.passive, color: '#F9A63A' },
    { value: data.promoters, color: '#12B76A' },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.gauge}>
        <ResponsivePie
          animate={false}
          colors={({ data: { color } }) => color}
          data={gaugeData}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          endAngle={90}
          innerRadius={0.7}
          isInteractive={false}
          startAngle={-90}
        />
        <Text
          size="30px"
          weight="700"
          style={{
            position: 'absolute',
            bottom: 28,
            left: 0,
            right: 0,
            margin: '0 auto',
            width: 'fit-content',
          }}
        >
          {data.npsResult}
        </Text>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            margin: '0 auto',
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text
            size="18px"
            weight="700"
            color={data.diffNps < 0 ? 'error500' : 'success500'}
            className={classes.diff}
            style={{
              background:
                data.diffNps < 0 ? color.primary.soft : color.green.soft,
            }}
          >
            <ArrowTriangleDown
              className={clsx({
                [classes.diffIcon]: true,
                [classes.diffIconNegative]: data.diffNps < 0,
              })}
            />
            {data.diffNps < 0 ? data.diffNps * -1 : data.diffNps}
          </Text>
          {data?.diffString && (
            <Text size="12px" weight="400">
              vs {data?.diffString}
            </Text>
          )}
        </div>
      </div>
      <Text style={{ marginTop: 8 }}>{data.totalResponden} Response</Text>
    </div>
  );
};

NpsMeter.defaultProps = {
  percentage: 0,
  responden: 0,
};

NpsMeter.propTypes = {
  percentage: PropTypes.number,
  responden: PropTypes.number,
};

export default NpsMeter;
