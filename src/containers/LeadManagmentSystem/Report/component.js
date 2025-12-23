/* eslint-disable no-case-declarations */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box } from '@material-ui/core';
import BarChart from '@__old/components/elements/BarChart';
import CallbackAlert from '@__old/components/elements/CallbackAlert';
import LineChart from '@__old/components/elements/LineChart';
import PieChart from '@__old/components/elements/PieChart';
import HorizontalBar from '@components/HorizontalBarChart/HorizontalBarChart';
import Typography from '@components/Typography';
import { isHaveAccess } from '@utils/common';
import { normalizeChart } from './chartHandler';
import {
  filterStatusOptions,
  filterStatusTimeOption,
  chartTypeOptions,
  filterViewOption,
  barChartProps,
  lineChartProps,
  colorBar,
} from './constant';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import Reload from '@assets/icon-v2/Reload';
import { ACTIONS } from '@constants/index';
import Filter from '@fragments/Filter/Filter';

const SectionContainer = ({ title, children }) => (
  <div style={{ marginTop: '32px' }}>
    <Typography
      children={title}
      color="general-mid"
      variant="h4"
      weight="medium"
    />
    <Box children={children} mt={4} />
  </div>
);

function Component(props) {
  const {
    action,
    // classes,
    isLoading,
    listProduct,
    listSource,
    listAM,
    listSegment,
    graphInterestedProduct,
    graphInterestedStatus,
    graphInterestedAM,
    graphInterestedSegment,
    feature,
    search,
    dispatch,
  } = props;

  const [activeTab, setActiveTab] = useState(0);
  const [tabData] = useState([
    'By Status',
    'By Product',
    'By Account Manager',
    'By Segment',
  ]);
  const [statusSource, setStatusSource] = useState({
    label: 'All Source',
    value: '',
  });
  const [statusStatus, setStatusStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [statusTime, setStatusTime] = useState({
    label: 'Daily',
    value: 'daily',
  });
  const [statusDateRange, setStatusDateRange] = useState([
    moment(new Date()).subtract(6, 'd'),
    moment(new Date()),
  ]);
  const [productProducts, setProductProducts] = useState({
    label: 'All Product',
    value: '',
  });
  const [productSource, setProductSource] = useState({
    label: 'All Source',
    value: '',
  });
  const [productStatus, setProductStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [productDateRange, setProductDateRange] = useState([
    moment(new Date()),
    moment(new Date()),
  ]);
  const [productView, setProductView] = useState({
    label: 'View By Count',
    value: 'count',
  });
  const [amFilter, setAmFilter] = useState([
    { label: 'All Account Manager', value: '' },
  ]);
  const [segmentFilter, setSegmentFilter] = useState([
    { label: 'All Segment', value: '' },
  ]);

  const [chartType, setChartType] = useState({ label: 'Bar', value: 'bar' });
  const [alert, setAlert] = useState({});

  const fetchData = () => {
    switch (activeTab) {
      case 0:
        action.getInterestedGraph({
          reportTime: statusTime.value,
          status: statusStatus.value,
          source: statusSource.value,
          startDate: statusDateRange[0]
            ? moment(statusDateRange[0]).format('YYYY-MM-DD')
            : '',
          endDate: statusDateRange[1]
            ? moment(statusDateRange[1]).format('YYYY-MM-DD')
            : '',
        });
        break;
      case 1:
        action.getInterestedGraphProduct({
          status: productStatus.value,
          product: productProducts.value,
          source: productSource.value,
          startDate: productDateRange[0]
            ? moment(productDateRange[0]).format('YYYY-MM-DD')
            : '',
          endDate: productDateRange[1]
            ? moment(productDateRange[1]).format('YYYY-MM-DD')
            : '',
        });
        break;
      case 2:
        let amFilterValue;
        if (amFilter) amFilterValue = amFilter.map((item) => item?.value);
        action.getInterestedGraphAM({
          filter: amFilter ? amFilterValue.join(',') : '',
          search,
        });
        break;
      case 3:
        let segmentFilterValue;
        if (segmentFilter)
          segmentFilterValue = segmentFilter.map((item) => item?.value);
        action.getInterestedGraphSegment({
          filter: segmentFilter ? segmentFilterValue.join(',') : '',
          search,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    action.getSource();
    action.getProduct();
    action.getAMValid();
    action.getSegmentValid();
  }, []);

  useEffect(() => {
    if (isHaveAccess(feature, 'read_graphic_lead')) {
      fetchData();
    } else {
      setAlert({
        content: "You don't have permission to view graphic.",
        success: false,
      });
    }
  }, [
    statusTime,
    statusStatus,
    statusSource,
    statusDateRange,
    productSource,
    productStatus,
    productProducts,
    productDateRange,
    activeTab,
    amFilter,
    segmentFilter,
    search,
  ]);

  const chartData = (data, view = '') => {
    if (chartType.value === 'pie') {
      return normalizeChart(data, {
        ...graphInterestedStatus.params,
        chartType: chartType.value,
        view: view,
      });
    } else {
      return normalizeChart(
        data.sort((a, b) => {
          const date =
            moment(a._id.date).format('YYYYMMDD') -
            moment(b._id.date).format('YYYYMMDD');
          const week = a._id.week - b._id.week;
          const month =
            moment(a._id.month).format('MM') - moment(b._id.month).format('MM');
          const year =
            moment(a._id.yearly).format('YYYY') -
            moment(b._id.yearly).format('YYYY');

          return date || (week && month && year) || month || year;
        }),
        {
          ...graphInterestedStatus.params,
          chartType: chartType.value,
          view: view,
        },
      );
    }
  };

  const optionsSource = (listSource) => {
    let optionsSource = [{ label: 'All Source', value: '' }];
    listSource.length > 0 &&
      listSource.map(({ name, value }) => {
        optionsSource.push({ label: name, value: value });
      });
    return optionsSource;
  };

  const optionsProduct = (listProduct) => {
    let optionsProduct = [{ label: 'All Product', value: '' }];
    listProduct.length > 0 &&
      listProduct.map(({ name }) => {
        optionsProduct.push({ label: name, value: name });
      });
    return optionsProduct;
  };

  const optionsAM = () => {
    let optionsAM = [{ label: 'All Account Manager', value: '' }];
    listAM.length > 0 &&
      listAM.map(({ name }) => {
        optionsAM.push({ label: name, value: name });
      });
    return optionsAM;
  };

  const optionsSegment = () => {
    let optionsSegment = [{ label: 'All Segment', value: '' }];
    listSegment.length > 0 &&
      listSegment.map(({ name }) => {
        optionsSegment.push({ label: name, value: name });
      });
    return optionsSegment;
  };

  const handleChangeTab = (activeTab) => {
    setActiveTab(activeTab);
    if (activeTab === 0) {
      setChartType({ label: 'Bar', value: 'bar' });
    } else {
      setChartType({ label: 'Pie', value: 'pie' });
    }
  };

  const handleRefresh = () => {
    switch (activeTab) {
      case 0:
        setStatusSource({ label: 'All Source', value: '' });
        setStatusStatus({ label: 'All Status', value: '' });
        setStatusTime({ label: 'Daily', value: 'daily' });
        setStatusDateRange([
          moment(new Date()).subtract(6, 'd'),
          moment(new Date()),
        ]);
        break;
      case 1:
        setProductProducts({ label: 'All Product', value: '' });
        setProductSource({ label: 'All Source', value: '' });
        setProductStatus({ label: 'All Status', value: '' });
        setProductView({ label: 'View By Count', value: 'count' });
        setProductDateRange([moment(new Date()), moment(new Date())]);
        break;
      case 2:
        setAmFilter([{ label: 'All Account Manager', value: '' }]);
        break;
      case 3:
        setSegmentFilter([{ label: 'All Segment', value: '' }]);
        break;
      default:
        break;
    }
  };

  const handlePieLabel = () => {
    const startDate = productDateRange[0]
      ? moment(productDateRange[0]).format('DD MMMM YYYY')
      : '';
    const endDate = productDateRange[1]
      ? moment(productDateRange[1]).format('DD MMMM YYYY')
      : '';

    if (startDate === endDate) {
      return endDate;
    } else {
      return `${startDate} - ${endDate}`;
    }
  };

  const closeAlert = () => setAlert(false);

  const renderAlert = <CallbackAlert onClose={closeAlert} {...alert} />;

  const getFilter = () => {
    switch (activeTab) {
      case 0:
        return [
          {
            grid: {
              sm: 'auto',
              xs: 12,
            },
            onChange: setStatusDateRange,
            type: 'dateRange',
            value: statusDateRange,
            variant: 'secondary',
          },
          {
            staticWidth: 150,
            grid: {
              sm: 'auto',
              xs: 6,
            },
            onChange: setStatusSource,
            options: optionsSource(listSource),
            type: 'dropdown',
            value: statusSource,
          },
          {
            staticWidth: 130,
            grid: {
              sm: 'auto',
              xs: 6,
            },
            onChange: setStatusStatus,
            options: filterStatusOptions,
            type: 'dropdown',
            value: statusStatus,
          },
          {
            staticWidth: 110,
            grid: {
              sm: 'auto',
              xs: 6,
            },
            onChange: setStatusTime,
            options: filterStatusTimeOption,
            type: 'dropdown',
            value: statusTime,
          },
          {
            staticWidth: 100,
            grid: {
              sm: 'auto',
              xs: 6,
            },
            onChange: setChartType,
            options: chartTypeOptions,
            type: 'dropdown',
            value: chartType,
          },
        ];
      case 1:
        return [
          {
            grid: {
              sm: 'auto',
              xs: 12,
            },
            onChange: setProductDateRange,
            type: 'dateRange',
            value: productDateRange,
          },
          {
            staticWidth: 160,
            grid: {
              sm: 'auto',
              xs: 6,
            },
            onChange: setProductProducts,
            options: optionsProduct(listProduct),
            type: 'dropdown',
            value: productProducts,
          },
          {
            staticWidth: 160,
            grid: {
              sm: 'auto',
              xs: 6,
            },
            onChange: setProductSource,
            options: optionsSource(listSource),
            type: 'dropdown',
            value: productSource,
          },
          {
            staticWidth: 160,
            grid: {
              sm: 'auto',
              xs: 6,
            },
            onChange: setProductStatus,
            options: filterStatusOptions,
            type: 'dropdown',
            value: productStatus,
          },
          {
            minWidth: 210,
            grid: {
              sm: 'auto',
              xs: 6,
            },
            onChange: setProductView,
            options: filterViewOption,
            type: 'dropdown',
            value: productView,
          },
        ];
      case 2:
        return [
          {
            grid: {
              sm: 'auto',
              xs: 6,
            },
            hideSelectedOptions: false,
            isMulti: true,
            onChange: setAmFilter,
            options: optionsAM(),
            minWidth: 240,
            placeholder: 'All Account Manager',
            type: 'dropdown',
            value: amFilter,
          },
        ];
      case 3:
        return [
          {
            staticWidth: 210,
            grid: {
              sm: 'auto',
              xs: 6,
            },
            hideSelectedOptions: false,
            isMulti: true,
            onChange: setSegmentFilter,
            options: optionsSegment(),
            placeholder: 'All Segment',
            type: 'dropdown',
            value: segmentFilter,
          },
        ];
      default:
        return [];
    }
  };

  const keys = ['Opportunity', 'Quote', 'Agreement', 'Order', 'Provisioning'];

  const colorKeys = {
    Opportunity: '#3071D9',
    Quote: '#FD7E14',
    Agreement: '#CFE0FC',
    Order: '#3BA064',
    Provisioning: '#DE1B1B',
  };

  const renderChart = () => {
    const amChartProps = {
      colors: colorBar,
      data: graphInterestedAM.data,
      indexBy: 'name',
      leftLabel: 'ACCOUNT MANAGER NAME',
      keys: keys,
      tooltip: ({ data }) => {
        const _keys = keys.map((v, idx) => {
          return (
            <>
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '172px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      backgroundColor: colorKeys[v],
                      height: '0.5rem',
                      marginRight: '0.5rem',
                      width: '0.5rem',
                    }}
                  />
                  <Typography>{v}</Typography>
                </div>
                <Typography>{data[v] || 0}</Typography>
              </div>
            </>
          );
        });
        return (
          <div style={{ backgroundColor: 'white', padding: '0.5rem' }}>
            {_keys}
            <div
              style={{
                borderTop: '1px solid #B3C3CA',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.5rem',
              }}
            >
              <Typography>Total</Typography>
              <Typography weight="bold">{data.total}</Typography>
            </div>
          </div>
        );
      },
      loading: isLoading,
      groupMode: 'stacked',
    };
    const segmentChartProps = {
      data: graphInterestedSegment.data,
      indexBy: 'name',
      leftLabel: 'SEGMENT NAME',
      loading: isLoading,
    };

    switch (activeTab) {
      case 0:
        if (chartType.value === 'bar') {
          return (
            <BarChart
              data={chartData(graphInterestedStatus.data)}
              {...barChartProps()}
            />
          );
        } else if (chartType.value === 'line') {
          return (
            <LineChart
              data={chartData(graphInterestedStatus.data)}
              {...lineChartProps()}
            />
          );
        }
      case 1:
        return (
          <PieChart
            data={chartData(graphInterestedProduct.data, productView.value)}
            label={handlePieLabel()}
            percent={productView.value === 'percent'}
          />
        );
      case 2:
        return (
          <SectionContainer title="Account Manager List">
            <HorizontalBar {...amChartProps} />
          </SectionContainer>
        );
      case 3:
        return (
          <SectionContainer title="Segment List">
            <HorizontalBar {...segmentChartProps} />
          </SectionContainer>
        );
      default:
        break;
    }
  };

  return (
    <Fragment>
      <HeaderAndFilter
        action={[
          {
            onClick: handleRefresh,
            children: 'Refresh',
            loading: isLoading,
            leftIcon: Reload,
          },
        ]}
        breadcrumb={[{ label: 'Report' }]}
        tabs={{
          onChange: handleChangeTab,
          options: tabData.map((item, i) => ({ label: item, value: i })),
          value: activeTab,
        }}
      />
      <div
        style={{
          background: 'white',
          margin: '8px 40px',
          padding: '24px 32px',
          borderRadius: 8,
        }}
      >
        <Filter
          filter={getFilter().reverse()}
          search={
            activeTab === 2 || activeTab === 3
              ? {
                  placeholder: 'Search..',
                  value: search,
                  onChange: (value) =>
                    dispatch({
                      type: ACTIONS.SEARCH_QUERY,
                      data: value,
                    }),
                }
              : undefined
          }
        />
        {renderChart()}
      </div>
      {renderAlert}
    </Fragment>
  );
}

Component.defaultProps = {
  classes: {},
  isLoading: false,
  listAM: [],
  listProduct: [],
  listSegment: [],
  listSource: [],
  search: '',
};

Component.propTypes = {
  action: PropTypes.object.isRequired,
  classes: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  feature: PropTypes.array.isRequired,
  graphInterestedAM: PropTypes.object.isRequired,
  graphInterestedProduct: PropTypes.object.isRequired,
  graphInterestedSegment: PropTypes.object.isRequired,
  graphInterestedStatus: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  listAM: PropTypes.array,
  listProduct: PropTypes.array,
  listSegment: PropTypes.array,
  listSource: PropTypes.array,
  search: PropTypes.string,
};

SectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Component;
