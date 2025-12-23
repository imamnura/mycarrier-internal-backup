import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import BarChart from '@__old/components/elements/BarChart';
import LineChart from '@__old/components/elements/LineChart';
import { barChartProps, LineChartProps, dateRange, options } from './constants';
import { detectChangeState, isHaveAccess } from '@__old/utils/common';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import { normalizeChart } from './chartHandler';
import Filter from '@fragments/Filter';
import ActionButton from './elements/ActionButton';
import moment from 'moment';
import { Box } from '@legion-ui/core';

export default class Component extends React.Component {
  state = {
    activeTab: 0,
    chartType: { label: 'Bar', value: 'bar' },
    reportTime: { label: 'Daily', value: 'daily' },
    reportCustomer: { label: 'All Customer', value: '' },
    reportType: { label: 'Last Update', value: 'totalSender' },
    rangeTime: [moment().add(-7, 'days'), moment()],
  };

  componentDidMount() {
    this.fetchDataGraph();
  }

  componentDidUpdate(prevProps, prevState) {
    const changeState = [
      'reportTime',
      'reportCustomer',
      'activeTab',
      'rangeTime',
      'reportType',
    ];
    const detectParams = { changed: changeState, prevState, state: this.state };
    detectChangeState(detectParams) && this.fetchDataGraph();
  }

  fetchDataGraph = () => {
    const {
      activeTab,
      reportTime,
      reportCustomer,
      chartType,
      rangeTime,
      reportType,
    } = this.state;
    const { actions, feature } = this.props;
    actions.resetGraphData();
    const reportTypeDate =
      !isHaveAccess(feature, 'read_total_bulk') || activeTab === 1
        ? 'deliveryTime'
        : reportType.value;
    if (
      isHaveAccess(feature, 'read_total_bulk') ||
      isHaveAccess(feature, 'read_time_delivery')
    ) {
      actions.getListActivateCustomer('sender-id');
      actions.getDataChart({
        custAccntNum: reportCustomer.value,
        reportTime: reportTime.value,
        chartType: chartType.value,
        reportType: reportTypeDate,
        startDate: rangeTime[0] ? rangeTime[0].format('YYYY-MM-DD') : '',
        endDate: rangeTime[1] ? rangeTime[1].format('YYYY-MM-DD') : '',
      });
    }
  };

  handleChangeTab = (activeTab) => {
    this.setState({ activeTab, chartType: { label: 'Bar', value: 'bar' } });
    this.props.actions.resetGraphData();
  };

  handleChangeChartType = (chartType) => this.setState({ chartType });

  handleChangeReportTime = (reportTime) => {
    this.setState({ reportTime, rangeTime: dateRange(reportTime.value) });
  };

  optionsTab = () => {
    const { feature } = this.props;
    const res = [];

    if (isHaveAccess(feature, 'read_total_bulk')) {
      res.push({ value: 0, label: 'Total Bulk' });
    }
    if (isHaveAccess(feature, 'read_time_delivery')) {
      res.push({ value: 1, label: 'Time Delivery' });
    }

    if (!this.state.activeTab) {
      this.setState({
        activeTab: res[0]?.value,
      });
    }

    return res;
  };

  handleChangeReportCustomer = (reportCustomer) =>
    this.setState({ reportCustomer });

  // handleChangeRangeTime = rangeTime => this.setState({ rangeTime });

  handleChangeReportType = (reportType) => this.setState({ reportType });

  optionsReportCustomer = (listActivateCustomer) => {
    let optionsCustomer = [{ label: 'All Customer', value: '' }];

    listActivateCustomer.map(({ custAccntName, custAccntNum }) =>
      optionsCustomer.push({ label: custAccntName, value: custAccntNum }),
    );

    return optionsCustomer;
  };

  render() {
    const { activeTab, chartType, reportTime, reportCustomer, reportType } =
      this.state;
    const {
      graphSender: { data, params },
      actions,
      feature,
      isLoading,
      listActivateCustomer,
    } = this.props;

    const chartData = normalizeChart(
      data.sort((a, b) => {
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
        ...params,
        chartType: chartType.value,
      },
    );

    const tabProps = {
      options: this.optionsTab(),
      value:
        isHaveAccess(feature, 'read_time_delivery') === false ||
        isHaveAccess(feature, 'read_total_bulk') === false
          ? 'Total Bulk'
          : activeTab,
      onChange: this.handleChangeTab,
    };

    const filterProps = () => {
      const filters = [];

      filters.push({
        maxWidth: 300,
        onChange: this.handleChangeChartType,
        options: options.type,
        type: 'dropdown',
        value: chartType,
      });
      filters.push({
        maxWidth: 300,
        onChange: this.handleChangeReportTime,
        options: options.time,
        type: 'dropdown',
        value: reportTime,
      });
      filters.push({
        maxWidth: 300,
        onChange: this.handleChangeReportCustomer,
        options: this.optionsReportCustomer(listActivateCustomer),
        type: 'dropdown',
        value: reportCustomer,
      });
      filters.push({
        maxWidth: 300,
        onChange: this.handleChangeReportType,
        options: options.date,
        type: 'dropdown',
        value: reportType,
      });

      return filters;
    };

    return (
      <>
        <HeaderAndFilter
          action={
            <ActionButton
              actions={actions}
              feature={feature}
              id="button"
              isLoading={isLoading}
              optionsCustomer={this.optionsReportCustomer(listActivateCustomer)}
              refresh={this.fetchDataGraph}
            />
          }
          breadcrumb={[{ label: 'Bulk' }]}
          tabs={tabProps}
        />
        <Grid container>
          <Grid
            style={{
              background: 'white',
              margin: '8px 40px',
              padding: '24px 32px',
              borderRadius: 8,
            }}
            xs={12}
          >
            <Box mt="10px" mb="10px">
              <Filter filter={filterProps()} />
            </Box>
            {chartType.value === 'bar' ? (
              <BarChart
                data={chartData}
                {...barChartProps(activeTab, reportTime.value)}
              />
            ) : (
              <LineChart
                data={chartData}
                {...LineChartProps(activeTab, reportTime.value)}
              />
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}

Component.defaultProps = {
  actions: {},
  classes: {},
  graphSender: { data: [], params: {} },
  isLoading: false,
  listActivateCustomer: [],
};

Component.propTypes = {
  actions: PropTypes.object,
  classes: PropTypes.object,
  feature: PropTypes.array.isRequired,
  graphSender: PropTypes.object,
  isLoading: PropTypes.bool,
  listActivateCustomer: PropTypes.array,
};
