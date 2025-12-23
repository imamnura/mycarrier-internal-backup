import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Reload from '@assets/icon-v2/Reload';
import NPSScore from '@fragments/List';
import { isHaveAccess } from '@utils/common';
import useActions from './hooks/useActions';
import {
  schemaList,
  statusOptions,
  progressOptions,
  normalizeList,
} from './utils';

const List = (props) => {
  const { feature } = props;
  const {
    filterStatus,
    filterDateRange,
    list,
    loading,
    onPaginationChange,
    onClickRefresh,
    // onClickRowTable,
    search,
    setFilterStatus,
    setFilterDateRange,
    setSearch,
    setTab,
    tab,
  } = useActions(props);

  const optionsTab = useMemo(() => {
    const res = [];

    if (isHaveAccess(feature, 'read_list_approval_ticket_gameqoo')) {
      res.push({ value: 'approval', label: 'Approval Ticket' });
    }
    if (isHaveAccess(feature, 'read_list_history_ticket_gameqoo')) {
      res.push({ value: 'history', label: 'History Ticket' });
    }

    if (tab === '') {
      setTab(res[0]?.value || '');
    }

    return res;
  }, []);

  const filterProps = () => {
    const filters = [];

    if (
      tab === 'approval' &&
      isHaveAccess(feature, 'read_list_approval_ticket_gameqoo')
    ) {
      filters.push({
        maxWidth: 300,
        onChange: setFilterStatus,
        options: progressOptions,
        type: 'dropdown',
        value: filterStatus,
      });
      filters.push({
        onChange: setFilterDateRange,
        value: filterDateRange,
        type: 'dateRange',
      });
    }

    if (
      tab === 'history' &&
      isHaveAccess(feature, 'read_list_history_ticket_gameqoo')
    ) {
      filters.push({
        maxWidth: 300,
        onChange: setFilterStatus,
        options: statusOptions,
        type: 'dropdown',
        value: filterStatus,
      });
      filters.push({
        onChange: setFilterDateRange,
        value: filterDateRange,
        type: 'dateRange',
      });
    }
    return filters;
  };

  const action = () => {
    const button = [];

    if (tab) {
      button.push({
        onClick: onClickRefresh,
        children: 'Refresh',
        leftIcon: Reload,
      });
    }

    return button;
  };

  const listProps = {
    breadcrumb: [{ label: 'GameQoo' }],
    action: action(),
    filter: filterProps(),
    search: {
      placeholder: 'Global Search..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: useMemo(() => normalizeList(list.data), [list.data]),
      hovering: true,
      loadingRoot: loading.table,
      loading: false,
      meta: list.meta,
      schema: useMemo(() => schemaList(tab), [tab]),
      onPaginationChange: onPaginationChange,
    },
    tabs: {
      options: optionsTab,
      value: tab,
      onChange: setTab,
    },
  };

  return (
    <>
      <NPSScore {...listProps} />
    </>
  );
};

List.defaultProps = {
  feature: [],
};

List.propTypes = {
  feature: PropTypes.array,
};

export default List;
