import React from 'react';
import PropTypes from 'prop-types';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';
import List from '@fragments/List';
import Typography from '@components/Typography';
import useStyles from './styles';

const CustomerMRTGList = (props) => {
  const {
    list,
    page,
    loading,
    onPaginationChange,
    onClickRowTable,
    search,
    setSearch,
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

  const listProps = {
    title: 'MRTG',
    breadcrumb: [{ label: 'MRTG' }],
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

  return <List {...listProps} />;
};

CustomerMRTGList.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default CustomerMRTGList;
