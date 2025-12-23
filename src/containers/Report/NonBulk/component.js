import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Refresh from '@assets/Svg/Refresh';
import { normalizeChart } from './chartHandler';
import Dialog from '@__old/components/elements/Dialog';
import BarChart from '@__old/components/elements/BarChart';
import LineChart from '@__old/components/elements/LineChart';
import DownloadReport from '@__old/components/forms/DownloadReport';
import CallbackAlert from '@__old/components/elements/CallbackAlert';
import { options, LineChartProps, barChartProps, dateRange } from './constant';
import { isHaveAccess } from '@utils/common';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import Filter from '@fragments/Filter';
import { Box } from '@legion-ui/core';

export default function Component(props) {
  const {
    classes,
    isLoading,
    actions,
    graphLBA,
    listActivateCustomer,
    feature,
  } = props;

  const [reportCustomer, setReportCustomer] = useState({
    label: 'All Customer',
    value: '',
  });
  const [chartType, setChartType] = useState({ label: 'Bar', value: 'bar' });
  const [reportTime, setReportTime] = useState({
    label: 'Daily',
    value: 'daily',
  });
  const [reportDate, setReportDate] = useState({
    label: 'Last Update',
    value: 'totalByUpdateStatus',
  });

  const [formDownload, setFormDownload] = useState(false);
  const [alert, setAlert] = useState({});

  const fetchGraph = () => {
    const rangeTime = dateRange(reportTime.value);
    actions.resetGraphData();
    actions.getListActivateCustomer('lba');
    isHaveAccess(feature, 'read_request_nonBulk') &&
      actions.getDataChart({
        custAccntNum: reportCustomer.value,
        reportTime: reportTime.value,
        reportType: reportDate.value,
        startDate: rangeTime[0] ? rangeTime[0].format('YYYY-MM-DD') : '',
        endDate: rangeTime[1] ? rangeTime[1].format('YYYY-MM-DD') : '',
        chartType,
      });
  };

  useEffect(fetchGraph, [reportCustomer, chartType, reportTime, reportDate]);

  const chartData = normalizeChart(
    graphLBA.data.sort((a, b) => {
      const date =
        moment(a._id.date).format('YYYYMMDD') -
        moment(b._id.date).format('YYYYMMDD');
      const week = a._id.week - b._id.week;
      const month = a._id.month - b._id.month;
      const year = a._id.year - b._id.year;

      switch (reportTime.value) {
        case 'daily':
          return date;
        case 'weekly':
          if (month !== 0) {
            return month;
          } else {
            return week;
          }
        case 'monthly':
          if (year !== 0) {
            return year;
          } else {
            return month;
          }
        case 'yearly':
          return year;
        default:
          return;
      }
    }),
    {
      ...graphLBA.params,
      chartType: chartType.value,
    },
  );

  const handleDownload = () => setFormDownload(!formDownload);

  const optionsReportCustomer = (listActivateCustomer) => {
    let optionsCustomer = [{ label: 'All Customer', value: '' }];

    listActivateCustomer.map(({ custAccntName, custAccntNum }) =>
      optionsCustomer.push({ label: custAccntName, value: custAccntNum }),
    );

    return optionsCustomer;
  };

  const onSubmitDownload = (data) => {
    const { reportTime, custAccntNum, rangeTime, date } = data;

    const payload = {
      reportType: date.value,
      reportTime: reportTime.value,
      custAccntNum: custAccntNum.value === 'all' ? '' : custAccntNum.value,
      startDate: moment(rangeTime[0]).format('YYYY-MM-DD'),
      endDate: moment(rangeTime[1]).format('YYYY-MM-DD'),
    };

    actions.downloadReporting(payload, setAlert);
    handleDownload();
  };

  const renderDownload = (
    <Dialog maxWidth="xs" onClose={handleDownload} open={formDownload}>
      <DownloadReport
        id="download"
        onSubmit={onSubmitDownload}
        optionsCustomer={optionsReportCustomer(listActivateCustomer)}
        report="lba"
      />
    </Dialog>
  );

  const closeAlert = () => setAlert(false);

  const renderAlert = <CallbackAlert onClose={closeAlert} {...alert} />;

  const renderActionButton = () => {
    if (isHaveAccess(feature, 'read_downloadReport')) {
      return [
        {
          onClick: fetchGraph,
          children: (
            <Grid alignItems="center" container>
              <Refresh
                className={clsx(classes.refreshIcon, {
                  [classes.rotate]: isLoading,
                })}
              />
              REFRESH
            </Grid>
          ),
        },
        {
          onClick: handleDownload,
          children: 'DOWNLOAD',
        },
      ];
    } else {
      return [
        {
          onClick: fetchGraph,
          children: (
            <Grid alignItems="center" container>
              <Refresh
                className={clsx(classes.refreshIcon, {
                  [classes.rotate]: isLoading,
                })}
              />
              REFRESH
            </Grid>
          ),
        },
      ];
    }
  };

  const filterProps = [
    {
      maxWidth: 300,
      type: 'dropdown',
      onChange: setChartType,
      options: options.type,
      value: chartType,
    },
    {
      maxWidth: 300,
      type: 'dropdown',
      onChange: setReportTime,
      options: options.time,
      value: reportTime,
    },
    {
      maxWidth: 300,
      type: 'dropdown',
      onChange: setReportCustomer,
      options: optionsReportCustomer(listActivateCustomer),
      value: reportCustomer,
    },
    {
      maxWidth: 300,
      type: 'dropdown',
      onChange: setReportDate,
      options: options.date,
      value: reportDate,
    },
  ];
  return (
    <Fragment>
      <HeaderAndFilter
        action={renderActionButton()}
        breadcrumb={[{ label: 'Non Bulk' }]}
      />

      <Grid container>
        <Grid
          style={{
            background: 'white',
            margin: '24px 40px',
            padding: '24px 32px',
            borderRadius: 8,
          }}
          xs={12}
        >
          <Box mt="10px" mb="10px">
            <Filter filter={filterProps} />
          </Box>
          {chartType.value === 'bar' ? (
            <BarChart data={chartData} id="chart" {...barChartProps()} />
          ) : (
            <LineChart data={chartData} id="chart" {...LineChartProps()} />
          )}
        </Grid>
      </Grid>
      {renderDownload}
      {renderAlert}
    </Fragment>
  );
}

Component.defaultProps = {
  isLoading: false,
  listActivateCustomer: [],
};

Component.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  feature: PropTypes.array.isRequired,
  graphLBA: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  listActivateCustomer: PropTypes.array,
};
