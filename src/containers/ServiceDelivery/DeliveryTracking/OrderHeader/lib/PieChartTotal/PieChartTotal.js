import React from 'react';
import useStyles from './PieChartTotal.styles';
import { ResponsivePie } from '@nivo/pie';
import { Text } from '@legion-ui/core';
import StateMessage from '@components/StateMessage';
import NoData from '@assets/ilustration-v2/NoData';
import Skeleton from '@components/Skeleton';
import color from '@styles/color';
import clsx from 'clsx';

const Summary = ({ data, loading }) => {
  const classes = useStyles();

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
    { value: data.totalSubmitted, color: '#3366FF' },
    { value: data.totalCompleted, color: '#52BD94' },
    { value: data.totalInProgress, color: '#F79009' },
    { value: data.totalCanceled, color: '#F04438' },
    { value: data.totalFailed, color: '#DE1B1B' },
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
        <Text size="30px" weight="700" className={classes.title}>
          {data.totalOrder}
        </Text>
        <Text
          size="14px"
          color={color.general.mid}
          className={clsx(classes.totalOrder, classes.title)}
        >
          Total Order
        </Text>
      </div>
    </div>
  );
};

export default Summary;
