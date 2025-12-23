import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { Grid, Box } from '@material-ui/core';
import Refresh from '@assets/Svg/Refresh';
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
} from './constant';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import Filter from '@fragments/Filter';

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
    classes,
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
  } = props;

  const [activeTab, setActiveTab] = useState(0);
  const [tabData] = useState([
    { value: 0, label: 'By Status' },
    { value: 1, label: 'By Product' },
    { value: 2, label: 'By Account Manager' },
    { value: 3, label: 'By Segment' },
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
        // eslint-disable-next-line no-case-declarations
        let amFilterValue;
        if (amFilter) amFilterValue = amFilter.map((item) => item?.value);
        action.getInterestedGraphAM({
          filter: amFilter ? amFilterValue.join(',') : '',
          search,
        });
        break;
      case 3:
        // eslint-disable-next-line no-case-declarations
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
    if (isHaveAccess(feature, 'read_graphic_interested')) {
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
    //delete if cms product v2 ready
    // listProduct.length > 0 && listProduct.map(({ productName }) => {
    //   optionsProduct.push({ label: productName, value: productName });
    // });
    //end delete if cms product v2 ready

    //use if cms product v2 ready
    listProduct.length > 0 &&
      listProduct.map(({ name }) => {
        optionsProduct.push({ label: name, value: name });
      });
    //end use if cms product v2 ready
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
      ? productDateRange[0].format('DD MMMM YYYY')
      : '';
    const endDate = productDateRange[1]
      ? productDateRange[1].format('DD MMMM YYYY')
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
            onChange: setStatusDateRange,
            value: statusDateRange,
            type: 'dateRange',
          },
          {
            maxWidth: 300,
            type: 'dropdown',
            onChange: setStatusSource,
            options: optionsSource(listSource),
            value: statusSource,
          },
          {
            maxWidth: 300,
            type: 'dropdown',
            onChange: setStatusStatus,
            options: filterStatusOptions,
            value: statusStatus,
          },
          {
            maxWidth: 300,
            type: 'dropdown',
            onChange: setStatusTime,
            options: filterStatusTimeOption,
            value: statusTime,
          },
          {
            maxWidth: 300,
            type: 'dropdown',
            onChange: setChartType,
            options: chartTypeOptions,
            value: chartType,
          },
        ].reverse();
      case 1:
        return [
          {
            onChange: setProductDateRange,
            value: productDateRange,
            type: 'dateRange',
          },
          {
            maxWidth: 300,
            type: 'dropdown',
            onChange: setProductProducts,
            options: optionsProduct(listProduct),
            value: productProducts,
          },
          {
            maxWidth: 300,
            type: 'dropdown',
            onChange: setProductSource,
            options: optionsSource(listSource),
            value: productSource,
          },
          {
            maxWidth: 300,
            type: 'dropdown',
            onChange: setProductStatus,
            options: filterStatusOptions,
            value: productStatus,
          },
          {
            maxWidth: 300,
            type: 'dropdown',
            onChange: setProductView,
            options: filterViewOption,
            value: productView,
          },
        ].reverse();
      case 2:
        return [
          {
            isMulti: true,
            hideSelectedOptions: false,
            placeholder: 'All Account Manager',
            maxWidth: 300,
            minWidth: 210,
            type: 'dropdown',
            onChange: setAmFilter,
            options: optionsAM(),
            value: amFilter,
          },
        ];
      case 3:
        return [
          {
            isMulti: true,
            hideSelectedOptions: false,
            placeholder: 'All Segment',
            maxWidth: 300,
            minWidth: 210,
            type: 'dropdown',
            onChange: setSegmentFilter,
            options: optionsSegment(),
            value: segmentFilter,
          },
        ];
      default:
        return [];
    }
  };

  const renderChart = () => {
    const amChartProps = {
      data: graphInterestedAM.data,
      indexBy: 'name',
      leftLabel: 'ACCOUNT MANAGER NAME',
      loading: isLoading,
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

  const tabProps = {
    value: activeTab,
    options: tabData,
    onChange: handleChangeTab,
  };

  return (
    <Fragment>
      <HeaderAndFilter
        action={[
          {
            onClick: handleRefresh,
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
        ]}
        breadcrumb={[{ label: 'Interested List' }]}
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
            <Filter filter={getFilter()} />
          </Box>
          {renderChart()}
        </Grid>
      </Grid>
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
