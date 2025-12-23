import React from 'react';
import PropTypes from 'prop-types';
import Reload from '@assets/icon-v2/Reload';
import { isHaveAccess } from '@utils/common';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';
import Typography from '../../../../components/Typography';
import useStyles from './styles';

const BulkList = (props) => {
  const { feature } = props;
  const classes = useStyles();

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
        ...filter.operator,
        placeholder: 'All Operator',
        isMulti: true,
        hideSelectedOptions: false,
        maxWidth: 300,
        type: 'dropdown',
      });
      res.push({
        ...filter.customer,
        placeholder: 'All Customer',
        isMulti: true,
        hideSelectedOptions: false,
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

    if (isHaveAccess(feature, 'read_list_bulk_request')) {
      tabs.options.push({
        value: 'onprogress',
        label: 'Bulk Activation Requests',
      });
    }
    if (isHaveAccess(feature, 'read_list_bulk_active')) {
      tabs.options.push({ value: 'done', label: 'Active Bulk' });
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
      case 'checking order telkom':
        return 'Checking Telkom';
      case 'checking order provider':
        return 'Checking Provider';
      case 'onprogress':
        return 'Checking Order';
      case 'returned':
        return 'Returned';
      case 'rejected':
        return 'Rejected';
      case 'completed':
        return 'Completed';
      case 'suspend':
        return 'Suspend';
      default:
        return status;
    }
  };

  const arrayContent = (data) =>
    data.map((item, i) => (
      <p className={classes.tableText} key={i}>
        {!!i && <Typography children={', '} variant="body2" />}
        <Typography children={item} variant="body2" />
      </p>
    ));

  const tableList = (tab) => {
    switch (tab) {
      case 'onprogress': {
        return list.data.map((item) => ({
          ...item,
          status: normalizeStatus(item.activationStatus),
          messageType: arrayContent(item.messageType),
          contentPurpose: arrayContent(item.contentPurpose),
        }));
      }
      case 'done': {
        return list.data.map((item) => ({
          ...item,
          status: normalizeStatus(item.activationStatus),
          messageType: arrayContent(item.messageType),
        }));
      }
    }
  };

  const listProps = {
    title: 'Bulk',
    breadcrumb: [{ label: 'Bulk' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: 'Search...',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableList(tab),
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: tableHeader(tab),
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      onPaginationChange: onPaginationChange,
    },
    tabs: tabsProps(),
  };

  return <List {...listProps} />;
};

BulkList.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.array.isRequired,
};

export default BulkList;
