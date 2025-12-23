import React from 'react';
import { Box, Card, Text } from '@legion-ui/core';
import Status from '@components/Status';
import Skeleton from '@components/Skeleton/Skeleton';
import useStatusSummary from './StatusSummary.styles';

const StatusSummary = ({ data, loading }) => {
  const classes = useStatusSummary();

  const statusVariant = {
    completed: 'success',
    'not yet': 'primary',
    'on progress': 'warning',
  };

  const content = (status, data) => (
    <Card bordered radius="8px" style={{ minWidth: '200px' }}>
      <Box style={{ width: 'max-content' }}>
        <Status children={status} variant={statusVariant[status]} />
      </Box>
      {loading ? (
        <Box mt="12px">
          <Skeleton width="100%" height={20} />
        </Box>
      ) : (
        <Text children={data} weight="700" size="h6" color="secondary500" />
      )}
    </Card>
  );

  return (
    <div className={classes.statusSummary}>
      {data?.map((item) => content(item.status.toLowerCase(), item.respondent))}
    </div>
  );
};

export default StatusSummary;
