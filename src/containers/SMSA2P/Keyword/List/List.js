import React from 'react';
import PropTypes from 'prop-types';
import Reload from '@assets/icon-v2/Reload';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';

const KeywordList = (props) => {
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
        ...filter.status,
        maxWidth: 300,
        type: 'dropdown',
      });
      res.push({
        ...filter.customer,
        maxWidth: 300,
        type: 'dropdown',
        searchable: true,
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

    if (isHaveAccess(feature, 'read_list_request')) {
      tabs.options.push({
        value: 'progress',
        label: 'Keyword Activation Request',
      });
    }
    if (isHaveAccess(feature, 'read_list_active')) {
      tabs.options.push({ value: 'done', label: 'Active Keyword' });
    }
    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const normalizeStatus = (status) => {
    switch (status) {
      case 'checking':
        return 'Customer Request';
      case 'onprogress':
        return 'Checking Order';
      default:
        return status;
    }
  };

  const tableData = list.data.map((item) => ({
    ...item,
    status: normalizeStatus(item.activationStatus),
  }));

  const listProps = {
    title: 'Keyword',
    breadcrumb: [{ label: 'Keyword' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: 'Search Order Number...',
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

KeywordList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default KeywordList;
