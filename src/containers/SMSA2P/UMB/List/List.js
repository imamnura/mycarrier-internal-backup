import React from 'react';
import PropTypes from 'prop-types';
import Reload from '@assets/icon-v2/Reload';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';

const UMBList = (props) => {
  const { feature } = props;

  const {
    filter,
    list,
    onClickRowTable,
    onClickRefresh,
    orderBy,
    setOrderBy,
    search,
    setSearch,
    sort,
    setSort,
    tab,
    setTab,
    loadingTable,
    onPaginationChange,
    page,
    testLocator,
  } = useActions(props);

  const actionButton = () => {
    let button = [];

    if (tab) {
      button.push({
        id: testLocator.refresh,
        onClick: onClickRefresh,
        children: 'Refresh',
        loading: loadingTable,
        leftIcon: Reload,
      });
    }

    return button;
  };

  const filterProps = () => {
    let res = [];

    if (tab) {
      res.push({
        ...filter.status,
        id: testLocator.filters.status,
        maxWidth: 300,
        type: 'dropdown',
      });
      res.push({
        ...filter.customer,
        id: testLocator.filters.customer,
        maxWidth: 300,
        type: 'dropdown',
        searchable: true,
      });
      res.push({
        ...filter.dateRange,
        id: testLocator.filters.date,
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

    if (isHaveAccess(feature, 'read_list_request')) {
      tabs.options.push({
        id: testLocator.tab.request,
        value: 'progress',
        label: 'UMB Activation Requests',
      });
    }
    if (isHaveAccess(feature, 'read_list_active')) {
      tabs.options.push({
        id: testLocator.tab.active,
        value: 'done',
        label: 'Active UMB',
      });
    }
    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const normalizeStatus = (status) => {
    switch (status) {
      case 'customer request':
        return 'Customer Request';
      case 'checking':
        return 'Customer Request';
      case 'onprogress':
        return 'Checking Order';
      case 'rejected':
        return 'Rejected';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const tableData = list.data.map((item) => ({
    ...item,
    status: normalizeStatus(item.activationStatus),
  }));

  const listProps = {
    title: 'UMB',
    breadcrumb: [{ label: 'UMB' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      id: testLocator.search,
      placeholder: 'Search...',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: tableHeader,
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      onPaginationChange: onPaginationChange,
      id: testLocator.tableRow,
    },
    tabs: tabsProps(),
  };

  return <List {...listProps} />;
};

UMBList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default UMBList;
