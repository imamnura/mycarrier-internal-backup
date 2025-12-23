import React from 'react';
import PropTypes from 'prop-types';
import { schema } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';

const ProductList = (props) => {
  const {
    list,
    page,
    loading,
    onPaginationChange,
    onClickRowTable,
    search,
    setSearch,
    filter,
    useOrderBy,
    useOrderDirection,
  } = useActions(props);

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.date,
      maxWidth: 300,
      type: 'date',
    });
    res.push({
      ...filter.company,
      maxWidth: 300,
      type: 'dropdown',
    });

    return res;
  };

  const listProps = {
    title: 'Service List',
    breadcrumb: [{ label: 'Service List' }],
    filter: filterProps(),
    search: {
      placeholder: 'Search Customer or CA Number..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: list.data,
      loadingRoot: loading,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: schema,
      onPaginationChange: onPaginationChange,
      useOrderBy,
      useOrderDirection,
    },
  };

  return <List {...listProps} />;
};

ProductList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default ProductList;
