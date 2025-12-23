import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Button from '@components/Button';
import Detail from '@fragments/Detail';
import Status from '@components/Status';
import Typography from '@components/Typography';
import useAction from './hooks/useActions';
import { route } from '@configs';
import { statusLabel, statusVariant, detailSchema } from '../utils';

const LBADetail = (props) => {
  const {
    action,
    countDown,
    data,
    emailStatus,
    loading,
    hasAccessResend,
    onClickResend,
    orderNumber,
    time = {},
  } = useAction(props);

  const { second, minute } = time;

  const breadcrumb = [
    { label: 'LBA', url: route.lba('list') },
    { label: orderNumber || '-' },
  ];

  const showNotificationStatus = (
    <Box mt={2}>
      <Grid
        alignItems="base-line"
        container
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item md={6}>
          <Typography
            children={'NOTIFICATION STATUS'}
            color="general-mid"
            inline
            variant="caption"
          />
          <Box style={{ width: 'fit-content', marginTop: '8px' }}>
            {emailStatus ? (
              <Status
                children={emailStatus}
                variant={statusVariant[emailStatus]}
              />
            ) : (
              <Typography children="-" />
            )}
          </Box>
        </Grid>
        {emailStatus === 'Failed' && hasAccessResend && (
          <Grid item>
            <Button
              children="Resend Notification"
              disabled={!!countDown}
              onClick={onClickResend}
            />
            {countDown > 0 && (
              <Typography
                children={`Resend again in: ${minute}:${second}`}
                color="general-mid"
                inline
                style={{ marginTop: '4px' }}
                variant="caption"
              />
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema(data, showNotificationStatus)}
        status={{
          children: statusLabel[data?.activationStatus],
          variant: statusVariant[statusLabel[data?.activationStatus]],
        }}
      />
    </>
  );
};

export default LBADetail;
