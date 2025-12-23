import React from 'react';
import PropTypes from 'prop-types';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';
import Typography from '@components/Typography';
import useStyles from './styles';
import DownloadForm from '@containers/ServiceDelivery/IPPrefix/lib/DownloadForm';

const CustomerIPPrefixList = (props) => {
  const {
    list,
    page,
    loading,
    onPaginationChange,
    onClickRowTable,
    search,
    setSearch,
    filter,
    action,
    modalDownload,
    setModalDownload,
  } = useActions(props);

  const classes = useStyles();

  const tableData = list.data.map((item) => ({
    ...item,
    isNewRequest: item?.isNewRequest && (
      <Typography color="blue-main">
        <span className={classes.iconDot} /> New update
      </Typography>
    ),
  }));

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.dateRange,
      type: 'dateRange',
    });

    return res;
  };

  const listProps = {
    title: 'IP Prefix',
    action: action,
    breadcrumb: [{ label: 'IP Prefix' }],
    filter: filterProps(),
    search: {
      placeholder: 'Search Customer...',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loading,
      loading: false,
      meta: list.meta,
      page,
      onClickRow: onClickRowTable,
      schema: tableHeader,
      onPaginationChange: onPaginationChange,
    },
  };

  return (
    <>
      <List {...listProps} />
      <DownloadForm open={modalDownload} setOpen={setModalDownload} />
    </>
  );
};

CustomerIPPrefixList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default CustomerIPPrefixList;
