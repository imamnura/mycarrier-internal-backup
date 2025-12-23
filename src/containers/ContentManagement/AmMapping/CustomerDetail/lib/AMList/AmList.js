import React from 'react';
import List from '@fragments/List';
import useActions from './hooks/useActions';
import { schema } from './utils';

const AmList = (props) => {
  const {
    list,
    loading,
    search,
    setSearch,
    setFilterPosition,
    filterSegment,
    filterSegmentOptions,
    setFilterSegment,
    filterPositionOptions,
    filterPosition,
    loadingTable,
    onPaginationChange,
    page,
  } = useActions(props);

  const filter = () => {
    let filters = [];

    filters.push({
      isLoading: loading.position,
      isSearchable: true,
      maxWidth: 200,
      onChange: setFilterPosition,
      options: filterPositionOptions,
      type: 'dropdown',
      value: filterPosition,
    });

    filters.push({
      isLoading: loading.segment,
      isSearchable: true,
      maxWidth: 200,
      onChange: setFilterSegment,
      options: filterSegmentOptions,
      type: 'dropdown',
      value: filterSegment,
    });

    return filters;
  };

  const listProps = {
    noMargin: true,
    noPadding: true,
    filter: filter(),
    search: {
      placeholder: 'Search AM Name or NIK..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: list.data,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      schema: schema,
      onPaginationChange: onPaginationChange,
    },
  };

  return <List {...listProps} />;
};

export default AmList;
