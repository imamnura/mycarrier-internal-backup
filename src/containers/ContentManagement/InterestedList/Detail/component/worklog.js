import React from 'react';
import { Grid } from '@material-ui/core';
import Steppers from '@__old/components/elements/Steppers';
import SteppersVertical from '@__old/components/elements/SteppersVertical';
import Text from '@__old/components/elements/Text';
import PropTypes from 'prop-types';
import moment from 'moment';
import { type } from '../constant';

export default function Component(props) {
  const { stepperProps, data, status } = props;

  if (!stepperProps) return null;

  const worklog = (worklogData) => {
    return worklogData.map((item) => {
      const { status: worklogStatus, timestamp } = item;

      return {
        title: type[worklogStatus]?.worklogLabel,
        date: moment(timestamp).format('DD/MM/YYYY HH:mm:ss'),
        caption:
          item.status === 'Retire' ? item?.note : type[worklogStatus]?.caption,
      };
    });
  };

  const stepperHistory = (
    <Grid xs={12}>
      <Text color="grey" variant="h4">
        Order Step
      </Text>
      <Steppers {...stepperProps} />
    </Grid>
  );

  const stepperWorklog = (
    <Grid xs={12}>
      <Text color="grey" variant="h4">
        History Work Log
      </Text>
      <SteppersVertical status={status} steps={worklog(data).reverse()} />
    </Grid>
  );

  return (
    stepperProps && (
      <Grid container spacing={1} style={{ marginTop: '24px' }}>
        {stepperHistory}
        {stepperWorklog}
      </Grid>
    )
  );
}

Component.propTypes = {
  data: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  stepperProps: PropTypes.object.isRequired,
};
