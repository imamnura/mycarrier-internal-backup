import React from 'react';
import PropTypes from 'prop-types';
import Reload from '@assets/icon-v2/Reload';
import List from '@fragments/List';
import { isHaveAccess } from '@utils/common';
import useActions from './hooks/useActions';
import { tableHeader } from './constant';

const Smsa2pList = (props) => {
  const {
    filter,
    list,
    page,
    loading,
    onPaginationChange,
    onClickDownload,
    onClickRefresh,
    onClickRowTable,
    search,
    setSearch,
    setSort,
    setOrderBy,
    sort,
    orderBy,
    setTab,
    tab,
  } = useActions(props);

  const { feature } = props;

  const tabsProps = () => {
    let tabs = {
      options: [],
      value: tab,
      onChange: setTab,
    };
    if (isHaveAccess(feature, 'read_active')) {
      tabs.options.push({ value: 'active', label: 'Active Ticket' });
    }
    if (isHaveAccess(feature, 'read_history')) {
      tabs.options.push({ value: 'done', label: 'History Ticket' });
    }
    if (tab === '') setTab(tabs.options[0]?.value);
    return tabs;
  };

  const filterProps = () => {
    let res = [];

    if (tab) {
      res.push({
        ...filter.status,
        maxWidth: 300,
        type: 'dropdown',
      });
      res.push({
        ...filter.customer,
        maxWidth: 300,
        type: 'dropdown',
      });
      res.push({
        ...filter.dateRange,
        type: 'dateRange',
      });
    }
    return res;
  };

  const actionProps = () => {
    let button = [];

    if (tab) {
      button.push({
        onClick: onClickRefresh,
        children: 'Refresh',
        loading: loading.chart,
        leftIcon: Reload,
      });
    }

    if (
      (tab === 'active' && isHaveAccess(feature, 'read_downloadActive')) ||
      (tab === 'done' && isHaveAccess(feature, 'read_downloadHistory'))
    ) {
      button.push({
        onClick: onClickDownload,
        children: 'Download',
        loading: loading.download,
      });
    }

    return button;
  };

  const tableData = list.data.map((d) => ({
    ...d,
    status: normalizeStatus(d.status),
  }));

  function normalizeStatus(status) {
    switch (status) {
      case 'checking':
        return 'Ticket Analyze';
      case 'onprogress':
        return 'Technical Handling';
      case 'customerreview':
        return 'Customer Review';
      case 'completed':
        return 'Closed';
      default:
        return status;
    }
  }

  const listProps = {
    title: 'SMS A2P',
    breadcrumb: [{ label: 'SMS A2P' }],
    action: actionProps(),
    filter: filterProps(),
    search: {
      placeholder: 'Search...',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loading.table,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      schema: tableHeader,
      onPaginationChange: onPaginationChange
    },
    tabs: tabsProps(),
  };

  return <List {...listProps} />;
};

Smsa2pList.defaultProps = {
  feature: [],
};

Smsa2pList.propTypes = {
  feature: PropTypes.array,
};

export default Smsa2pList;
