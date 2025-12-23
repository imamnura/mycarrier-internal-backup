import React from 'react';
import List from '@fragments/List';
import PropTypes from 'prop-types';
import { schema } from './constant';
import useActions from './hooks/useActions';

const ListDeliveryTracking = (props) => {
  const {
    list,
    page,
    loading,
    onPaginationChange,
    filter,
    setSearch,
    search,
    useOrderBy,
    useOrderDirection,
    onClickRowTable,
  } = useActions(props);

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.date,
      maxwith: 300,
      type: 'dateRange',
    });

    return res;
  };

  const listProps = {
    title: 'Delivery Tracking',
    breadcrumb: [{ label: 'Delivery Tracking' }],
    filter: filterProps(),
    search: {
      placeholder: 'Search Customer or CA Number..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: list.data,
      loadingRoot: loading.table,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: schema,
      onPaginationChange,
      useOrderBy,
      useOrderDirection,
    },
  };

  return <List {...listProps} />;
};

ListDeliveryTracking.defaultProps = {
  feature: [],
};

ListDeliveryTracking.propTypes = {
  feature: PropTypes.array,
};

export default ListDeliveryTracking;
