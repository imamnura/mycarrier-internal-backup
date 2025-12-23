import React from 'react';
import Reload from '@assets/icon-v2/Reload';
import List from '@fragments/List';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from '../utils';
import useActions from './hooks/useActions';
import PropTypes from 'prop-types';

const LBAList = (props) => {
  const { feature } = props;

  const {
    filter,
    list,
    onClickRowTable,
    onClickRefresh,
    search,
    setSearch,
    orderBy,
    setOrderBy,
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
      if (tab === 'progress') {
        res.push({
          ...filter.status,
          maxWidth: 300,
          type: 'dropdown',
        });
      }
      res.push({
        ...filter.operator,
        placeholder: 'All Operator',
        minWidth: 170,
        type: 'dropdown',
      });
      res.push({
        ...filter.customer,
        isMulti: true,
        placeholder: 'All Customer',
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
        label: 'LBA Activation Requests',
      });
    }
    if (isHaveAccess(feature, 'read_list_active')) {
      tabs.options.push({ value: 'done', label: 'Active LBA' });
    }
    if (tab === '') setTab(tabs.options[0]?.value);

    return tabs;
  };

  const listProps = {
    title: 'LBA',
    breadcrumb: [{ label: 'LBA' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: 'Search...',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: list.data,
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

LBAList.defaultProps = {
  feature: [],
};

LBAList.propTypes = {
  feature: PropTypes.array,
};

export default LBAList;
