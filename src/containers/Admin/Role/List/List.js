import React from 'react';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';

const RoleList = (props) => {
  const {
    filter,
    list,
    onClickRowTable,
    onClickAdd,
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

  const actionButton = () => {
    let button = [];

    button.push({ children: 'ADD ROLE', onClick: onClickAdd });

    return button;
  };

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
    title: 'Role Management',
    breadcrumb: [{ label: 'Role Management' }],
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: 'Search Role Name...',
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

export default RoleList;
