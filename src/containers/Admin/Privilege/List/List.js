import React from 'react';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';

const PrivilegeList = (props) => {
  const {
    filter,
    list,
    onClickRowTable,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    loadingTable,
    onPaginationChange,
    page,
  } = useActions(props);

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.userType,
      maxwidth: 200,
      type: 'dropdown',
    });

    return res;
  };

  const listProps = {
    title: 'Privilege Management',
    breadcrumb: [{ label: 'Privilege Management' }],
    filter: filterProps(),
    search: {
      placeholder: 'Search Privilege Name...',
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
  };

  return <List {...listProps} />;
};

export default PrivilegeList;
