import React from 'react';
import PropTypes from 'prop-types';
import Reload from '@assets/icon-v2/Reload';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';

const LinkList = (props) => {
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
        onClick: onClickRefresh,
        children: 'Refresh',
        loading: loadingTable,
        leftIcon: Reload,
        id: testLocator.refresh,
      });
    }

    return button;
  };

  const filterProps = () => {
    let res = [];

    if (tab) {
      res.push({
        ...filter.status,
        maxWidth: 300,
        type: 'dropdown',
        id: testLocator.filters.status,
      });
      res.push({
        ...filter.customer,
        maxWidth: 300,
        type: 'dropdown',
        searchable: true,
        id: testLocator.filters.customer,
      });
      res.push({
        ...filter.dateRange,
        type: 'dateRange',
        id: testLocator.filters.date,
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
        value: 'progress',
        label: 'Link Activation Requests',
        id: testLocator.tab.request,
      });
    }
    if (isHaveAccess(feature, 'read_list_active')) {
      tabs.options.push({
        value: 'done',
        label: 'Active Link',
        id: testLocator.tab.active,
      });
    }
    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const normalizeStatus = (status) => {
    switch (status) {
      case 'customerrequest':
        return 'Customer Request';
      case 'approval_am':
        return 'Customer Request';
      case 'checking':
        return 'Checking';
      case 'approval_provider':
        return 'Checking Order';
      case 'customerreview':
        return 'Customer Review';
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
    category: item?.category?.join(', '),
    status: normalizeStatus(item.activationStatus),
  }));

  const listProps = {
    title: 'Link',
    breadcrumb: [{ label: 'Link' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: 'Search...',
      value: search,
      onChange: setSearch,
      id: testLocator.search,
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

LinkList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default LinkList;
