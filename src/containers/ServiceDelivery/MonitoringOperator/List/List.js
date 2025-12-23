import React from 'react';
import PropTypes from 'prop-types';
import { schema } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';

const MonitoringOperator = (props) => {
  const {
    list,
    page,
    loading,
    onPaginationChange,
    // search, setSearch,
    filter,
  } = useActions(props);

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.dateRange,
      type: 'dateRange',
      label: 'All Period',
      variant: 'secondary',
    });
    res.push({
      ...filter.trunkGroup,
      isSearchable: true,
      maxWidth: 300,
      type: 'dropdown',
      isLoading: loading.optionsTrunkGroup,
    });
    res.push({
      ...filter.poi,
      isSearchable: true,
      maxWidth: 300,
      type: 'dropdown',
      isLoading: loading.optionsPoi,
    });
    res.push({
      ...filter.operator,
      maxWidth: 300,
      type: 'dropdown',
      isLoading: loading.optionsOperator,
    });

    return res;
  };

  const listProps = {
    title: 'Sistem Monitoring & Performansi Traffic Interkoneksi',
    breadcrumb: [
      { label: 'Sistem Monitoring & Performansi Traffic Interkoneksi' },
    ],
    filter: filterProps(),
    // search: {
    //   placeholder: 'Search Operator Name..',
    //   value: search,
    //   onChange: setSearch
    // },
    table: {
      data: list.data,
      loadingRoot: loading.table,
      loading: false,
      meta: list.meta,
      page,
      schema: schema,
      onPaginationChange: onPaginationChange,
    },
  };

  return <List {...listProps} />;
};

MonitoringOperator.defaultProps = {
  feature: [],
};

MonitoringOperator.propTypes = {
  feature: PropTypes.array,
};

export default MonitoringOperator;
