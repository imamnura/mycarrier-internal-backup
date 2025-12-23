import React from 'react';
import PropTypes from 'prop-types';
import Reload from '@assets/icon-v2/Reload';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';

const NonBulkList = (props) => {
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
  } = useActions(props);

  const actionButton = () => {
    let button = [];

    if (tab) {
      button.push({
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
        ...filter.customer,
        maxWidth: 300,
        type: 'dropdown',
        searchable: true,
      });
      res.push({
        ...filter.campaignType,
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

  const tabsProps = () => {
    let tabs = {
      options: [],
      value: tab,
      onChange: setTab,
    };

    if (isHaveAccess(feature, 'read_list_non_bulk_request')) {
      tabs.options.push({
        value: 'On Progress',
        label: 'Non Bulk Activation Request',
      });
    }
    if (isHaveAccess(feature, 'read_list_non_bulk_active')) {
      tabs.options.push({ value: 'Completed', label: 'Active Non Bulk' });
    }
    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const normalizeStatus = (status) => {
    switch (status) {
      case 'On Progress':
        return 'On Progress';
      case 'Completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const tableData = list.data.map((item) => ({
    ...item,
    status: normalizeStatus(item.status),
  }));

  const listProps = {
    title: 'Non Bulk',
    breadcrumb: [{ label: 'Non Bulk' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: 'Search Campaign Name, Order Number...',
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
    },
    tabs: tabsProps(),
  };

  return <List {...listProps} />;
};

NonBulkList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default NonBulkList;
