import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Reload from '@assets/icon-v2/Reload';
import ListDigitalProduct from '@fragments/List';
import { isHaveAccess } from '@utils/common';
import useActions from './hooks/useActions';
import { schema, normalizeList } from './utils';

const List = (props) => {
  const { feature } = props;
  const {
    filterDateRange,
    filterProduct,
    filterStatus,
    list,
    page,
    loading,
    onPaginationChange,
    onClickDownload,
    onClickRefresh,
    onClickRowTable,
    optionsStatus,
    optionsProduct,
    search,
    setFilterDateRange,
    setFilterProduct,
    setFilterStatus,
    setSearch,
    setTab,
    tab,
  } = useActions(props);

  const optionsTab = useMemo(() => {
    const res = [];

    if (isHaveAccess(feature, 'read_list_approval_ticket_digital_product')) {
      res.push({ value: 'approval', label: 'Approval Ticket' });
    }
    if (isHaveAccess(feature, 'read_list_history_ticket_digital_product')) {
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
      isHaveAccess(feature, 'read_list_approval_ticket_digital_product')
    ) {
      filters.push({
        maxWidth: 300,
        onChange: setFilterStatus,
        options: optionsStatus,
        type: 'dropdown',
        value: filterStatus,
        isLoading: loading.status,
      });

      filters.push({
        maxWidth: 300,
        onChange: setFilterProduct,
        options: optionsProduct,
        type: 'dropdown',
        value: filterProduct,
      });

      filters.push({
        onChange: setFilterDateRange,
        value: filterDateRange,
        type: 'dateRange',
      });
    }

    if (
      tab === 'history' &&
      isHaveAccess(feature, 'read_list_history_ticket_digital_product')
    ) {
      filters.push({
        maxWidth: 300,
        onChange: setFilterStatus,
        options: optionsStatus,
        type: 'dropdown',
        value: filterStatus,
        isLoading: loading.status,
      });

      filters.push({
        maxWidth: 300,
        onChange: setFilterProduct,
        options: optionsProduct,
        type: 'dropdown',
        value: filterProduct,
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

    if (
      (tab === 'approval' &&
        isHaveAccess(
          feature,
          'read_download_approval_ticket_digital_product',
        )) ||
      (tab === 'history' &&
        isHaveAccess(feature, 'read_download_history_ticket_digital_product'))
    ) {
      button.push({
        onClick: onClickDownload,
        children: 'Download',
        loading: loading.download,
      });
    }

    return button;
  };

  const listProps = {
    title: 'Digital Product',
    breadcrumb: [{ label: 'Digital Product' }],
    action: action(),
    filter: filterProps(),
    search: {
      placeholder: 'Global Search..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: useMemo(() => normalizeList(list.data), [list.data]),
      // hovering: true,
      loadingRoot: loading.table,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: schema(tab),
      onPaginationChange: onPaginationChange,
    },
    tabs: {
      options: optionsTab,
      value: tab,
      onChange: setTab,
    },
  };

  return <ListDigitalProduct {...listProps} />;
};

List.defaultProps = {
  feature: [],
};

List.propTypes = {
  feature: PropTypes.array,
};

export default List;
