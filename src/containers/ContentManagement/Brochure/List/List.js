import React from 'react';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';
import Reload from '@assets/icon-v2/Reload';

const InterestedList = (props) => {
  const {
    filter,
    list,
    loading,
    onClickRowTable,
    onClickRefresh,
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
      ...filter.datePick,
      type: 'dateRange',
      variant: 'secondary',
    });
    res.push({
      ...filter.newsletter,
      maxwidth: 200,
      type: 'dropdown',
    });
    res.push({
      ...filter.loginType,
      maxwidth: 200,
      type: 'dropdown',
    });
    res.push({
      ...filter.product,
      isLoading: loading.loadingFilterProduct,
      maxwidth: 200,
      type: 'dropdown',
    });

    return res;
  };

  const tableData = list.data?.map((d) => ({
    ...d,
    afterLogin: d.afterLogin ? 'After Login' : 'Before Login',
    allowNewsletter: d.allowNewsletter ? 'Yes' : 'No',
  }));

  const listProps = {
    title: 'User Download Brochure',
    breadcrumb: [{ label: 'User Download Brochure' }],
    action: [
      {
        onClick: onClickRefresh,
        children: 'Refresh',
        loading: loading.tableRoot,
        leftIcon: Reload,
      },
    ],
    filter: filterProps(),
    search: {
      placeholder: 'Search Name..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: tableHeader,
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
      onPaginationChange,
    },
  };

  return <List {...listProps} />;
};

export default InterestedList;
