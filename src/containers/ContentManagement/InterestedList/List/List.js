import React from 'react';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';
import Reload from '@assets/icon-v2/Reload';
import FormDownload from './FormDownload';
import PropTypes from 'prop-types';

const InterestedList = (props) => {
  const { feature } = props;

  const {
    filter,
    list,
    loading,
    onBottomPage,
    onClickRefresh,
    onClickRowTable,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    setModalDownload,
    modalDownload,
    filterParams,
    setLoadingDownload,
    scIntegrationStatus,
    loadingScIntegrationStatus,
  } = useActions(props);

  const actionButton = () => {
    let button = [];

    button.push({
      onClick: onClickRefresh,
      children: 'Refresh',
      loading: loading.tableRoot,
      leftIcon: Reload,
    });

    button.push({
      onClick: () => setModalDownload(true),
      children: 'Download',
      loading: loading.download,
    });

    return button;
  };

  const filterProps = () => {
    let res = [];

    if (scIntegrationStatus) {
      res.push({
        ...filter.starclickStatus,
        maxwidth: 200,
        type: 'dropdown',
      });
    }
    res.push({
      ...filter.status,
      maxwidth: 200,
      type: 'dropdown',
    });
    res.push({
      ...filter.source,
      isLoading: loading.loadingFilterSource,
      maxwidth: 900,
      type: 'dropdown',
    });
    res.push({
      ...filter.dateRange,
      type: 'dateRange',
      variant: 'secondary',
    });

    return res;
  };

  const labelStatus = (starclickStatus) => {
    if (starclickStatus === 'Create_Opportunity') return 'Opportunity';
    else if (starclickStatus === 'Delayed_Convert') return 'Delay Convert';
    else return starclickStatus;
  };

  const tableData = list.data?.map((d) => {
    return {
      ...d,
      starclickStatus: labelStatus(d.starclickStatus),
    };
  });

  const listProps = {
    breadcrumb: [{ label: 'Interested List' }],
    onBottomPage: onBottomPage,
    action: actionButton(),
    filter: filterProps(),
    search: {
      placeholder: 'Search Product, Company Name..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loading.tableRoot,
      loading: loading.tableRow && loadingScIntegrationStatus,
      meta: list.meta,
      onClickRow: onClickRowTable,
      schema: tableHeader(scIntegrationStatus),
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sort, setSort],
    },
  };

  return (
    <>
      <List {...listProps} />
      <FormDownload
        feature={feature}
        filterParams={filterParams}
        modalDownload={modalDownload}
        setLoadingDownload={setLoadingDownload}
        setModalDownload={setModalDownload}
      />
    </>
  );
};

InterestedList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default InterestedList;
