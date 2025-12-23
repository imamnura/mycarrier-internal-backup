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
import { options, LineChartProps, barChartProps } from './constant';
import { isHaveAccess } from '@utils/common';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import Filter from '@fragments/Filter';
import { Box } from '@legion-ui/core';

export default function Component(props) {
  const {
    classes,
    isLoading,
    actions,
    graphSMSC,
    listCustomerSMSC,
    listOperatorType,
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
  const [reportOperator, setReportOperator] = useState({
    label: 'All Operator',
    value: '',
  });

  const [formDownload, setFormDownload] = useState(false);
  const [alert, setAlert] = useState({});

  const fetchGraph = () => {
    actions.resetGraphData();
    actions.getListCustomerSMSC();
    actions.getListOperatorType();
    actions.getDataChart({
      customer: reportCustomer.value,
      reportTime: reportTime.value,
      operator: reportOperator.value,
      chartType,
    });
  };

  useEffect(fetchGraph, [
    reportCustomer,
    chartType,
    reportTime,
    reportOperator,
  ]);

  const chartData = normalizeChart(
    graphSMSC.data.sort((a, b) => {
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
      ...graphSMSC.params,
      chartType: chartType.value,
    },
  );

  const handleDownload = () => setFormDownload(!formDownload);

  const optionsReportCustomer = (listCustomerSMSC) => {
    let optionsCustomer = [{ label: 'All Customer', value: '' }];

    listCustomerSMSC.map(({ custAccntName, custAccntNum }) =>
      optionsCustomer.push({ label: custAccntName, value: custAccntNum }),
    );

    return optionsCustomer;
  };

  const optionsReportOperator = (listOperatorType) => {
    let optionsOperator = [{ label: 'All Operator', value: '' }];

    listOperatorType.map(({ operatorTypeId, operatorTypeName }) =>
      optionsOperator.push({ label: operatorTypeName, value: operatorTypeId }),
    );

    return optionsOperator;
  };

  const onSubmitDownload = (data) => {
    const { reportTime, custAccntNum, rangeTime, operatorId } = data;

    const payload = {
      // reportType: date.value,
      operatorId: operatorId.value === 'all' ? '' : operatorId.value,
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
        optionsCustomer={optionsReportCustomer(listCustomerSMSC)}
        optionsOperator={optionsReportOperator(listOperatorType)}
        report="smsc"
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
      onChange: setReportOperator,
      options: optionsReportOperator(listOperatorType),
      value: reportOperator,
    },
    {
      maxWidth: 300,
      type: 'dropdown',
      onChange: setReportCustomer,
      options: optionsReportCustomer(listCustomerSMSC),
      value: reportCustomer,
    },
  ];

  return (
    <Fragment>
      <HeaderAndFilter
        action={renderActionButton()}
        breadcrumb={[{ label: 'SMSC' }]}
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
            <BarChart
              data={chartData}
              id="chart"
              {...barChartProps(graphSMSC?.data)}
            />
          ) : (
            <LineChart data={chartData} id="chart " {...LineChartProps()} />
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
  listCustomerSMSC: [],
  listOperatorType: [],
};

Component.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  feature: PropTypes.array.isRequired,
  graphSMSC: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  listCustomerSMSC: PropTypes.array,
  listOperatorType: PropTypes.array,
};
