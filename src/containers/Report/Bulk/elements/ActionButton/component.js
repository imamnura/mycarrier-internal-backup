import React, { useState, Fragment, useEffect } from 'react';
import {
  Grid,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Dialog from '@__old/components/elements/Dialog';
import DownloadSenderReport from '@__old/components/forms/DownloadReport';
import moment from 'moment';
import { Refresh } from '@material-ui/icons';
import CallbackAlert from '@__old/components/elements/CallbackAlert';
import { isHaveAccess } from '@utils/common';
import Button from '@components/Button';

const Component = (props) => {
  const [formDownload, openFormDownload] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [alert, setAlert] = useState({ content: '' });

  const theme = useTheme();
  const mobileClient = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    if (!props.isLoading) {
      setRefreshLoading(false);
    }
  }, [props.isLoading]);

  const handleRefresh = () => {
    props.refresh();
    setRefreshLoading(true);
  };

  const handleChangeFormDownload = () => openFormDownload(!formDownload);

  const handleSubmit = (data) => {
    const { reportType, reportTime, custAccntNum, rangeTime, date } = data;

    const payload = {
      reportType:
        reportType.value === 'deliveryTime' ? reportType.value : date.value,
      reportTime: reportTime.value,
      custAccntNum: custAccntNum.value === 'all' ? '' : custAccntNum.value,
      startDate: moment(rangeTime[0]).format('YYYY-MM-DD'),
      endDate: moment(rangeTime[1]).format('YYYY-MM-DD'),
    };
    props.actions.downloadReporting(payload, setAlert);
  };

  return (
    <Fragment>
      <Grid
        container
        justify={mobileClient ? 'flex-start' : 'flex-end'}
        spacing={3}
      >
        {(isHaveAccess(props.feature, 'read_time_delivery') ||
          isHaveAccess(props.feature, 'read_total_bulk')) && (
          <Grid item>
            <Button id="refresh" variant="ghost" onClick={handleRefresh}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {refreshLoading ? (
                  <CircularProgress
                    size={16}
                    style={{ marginRight: 5 }}
                    thickness={5}
                  />
                ) : (
                  <Refresh fontSize="small" style={{ fontSize: 21 }} />
                )}
                &nbsp;<span>Refresh</span>
              </div>
            </Button>
          </Grid>
        )}
        {isHaveAccess(props.feature, 'read_downloadReport') && (
          <>
            <Grid item style={{ paddingTop: 16, paddingBottom: 16 }}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item>
              <Button id="changeform" onClick={handleChangeFormDownload}>
                Download
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <Dialog
        maxWidth="xs"
        onClose={handleChangeFormDownload}
        open={formDownload}
      >
        <DownloadSenderReport
          id="submitdownload"
          onSubmit={handleSubmit}
          optionsCustomer={props.optionsCustomer}
        />
      </Dialog>
      <CallbackAlert
        id="alert"
        {...alert}
        onClose={() => {
          if (alert.success) {
            handleChangeFormDownload();
          }
          setAlert({ content: '' });
        }}
      />
    </Fragment>
  );
};

Component.propTypes = {
  actions: PropTypes.object.isRequired,
  feature: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  optionsCustomer: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default Component;
