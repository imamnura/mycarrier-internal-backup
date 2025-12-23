import React from 'react';
import PropTypes from 'prop-types';
import List from '@fragments/List';
import useActions from './hooks/useAction';
import { titleCapitalize, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { listSchema, pickPageVisit } from './utils';
import ChartLegend from '@components/ChartLegend';
import Detail from '@fragments/Detail';
import HorizontalBarChart from '@components/HorizontalBarChart';

const DetailUserManagement = ({ feature }) => {
  const {
    filter,
    list,
    loading,
    search,
    setSearch,
    tab,
    setTab,
    type,
    chartData,
    loadingTable,
    onPaginationChange,
    page,
  } = useActions(feature);

  const breadcrumb = [
    { label: 'User Performance', url: route.reportUserManagement('report') },
    { label: `Journey Feature ${titleCapitalize(type)}` },
  ];

  const tableData = list.data.map((item) => ({
    ...item,
    // pageVisit: pageVisitLabel[item.pageVisit],
    //  pake ini aja, gaperlu modify di comp table
    //
    pageVisit: (
      <ChartLegend
        {...pickPageVisit(type, tab, item.pageVisit)}
        labelProps={{ weight: 'normal', variant: 'body2' }}
      />
    ),
  }));

  const filterProps = () => {
    let res = [];

    if (tab) {
      res.push({
        ...filter.dateRange,
        type: 'dateRange',
      });
    }
    return res;
  };

  const tabsProps = () => {
    let tabs = {
      options: [],
      value: tab,
      onChange: setTab,
    };

    if (
      type === 'internal' &&
      isHaveAccess(feature, 'read_user_management_report')
    ) {
      tabs.options.push({ value: 'activate', label: 'Activate' });
      tabs.options.push({ value: 'explore', label: 'Explore' });
      tabs.options.push({ value: 'evaluate', label: 'Evaluate' });
      tabs.options.push({ value: 'getSupport', label: 'Get Support' });
      tabs.options.push({ value: 'pay', label: 'Pay' });
    } else if (
      type === 'customer' &&
      isHaveAccess(feature, 'read_user_management_report')
    ) {
      tabs.options.push({ value: 'activate', label: 'Activate' });
      tabs.options.push({ value: 'getSupport', label: 'Get Support' });
      tabs.options.push({ value: 'pay', label: 'Pay' });
    }

    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const chartProps = chartData && {
    data: chartData,
    indexBy: 'title',
    leftLabel: 'Company',
    loading: loading.chartData,
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          title:
            type === 'customer' ? 'Company Accessing' : 'Account Accessing',
          hidden: !chartData,
          render: <HorizontalBarChart {...chartProps} />,
        },
        {
          type: 'custom',
          title: 'Detail Data',
          render: (
            <List
              noMargin
              noPadding
              table={{
                data: tableData,
                loadingRoot: loadingTable,
                loading: false,
                meta: list.meta,
                page,
                schema: listSchema(type),
                onPaginationChange: onPaginationChange,
              }}
              withTopDivider={false}
            />
          ),
        },
      ],
    },
  ];

  const detailProps = {
    breadcrumb: breadcrumb,
    filter: filterProps(),
    search: {
      placeholder: 'Search User ID..',
      value: search,
      onChange: setSearch,
    },
    loading: false,
    notFound: !tableData && !chartData,
    tabs: tabsProps(),
    schema: detailSchema,
  };

  return (
    <>
      <Detail {...detailProps} />
    </>
  );
};

DetailUserManagement.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default DetailUserManagement;
