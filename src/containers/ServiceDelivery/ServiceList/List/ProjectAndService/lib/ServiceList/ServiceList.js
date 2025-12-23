import React from 'react';
import PropTypes from 'prop-types';
import { DetailGenerator } from '@fragments/Detail';
import List from '@fragments/List';
import useActions from './hooks/useActions';
import { tableHeader } from '../../utils';
import Summary from '@containers/ServiceDelivery/ServiceList/lib/Summary';
import { Grid } from '@material-ui/core';

const ServiceList = (props) => {
  const {
    list,
    loading,
    onClickRowTable,
    search,
    setSearch,
    useOrderBy,
    useOrderDirection,
    filter,
    summarySchema,
    loadingTable,
    onPaginationChange,
    page,
  } = useActions(props);

  const filterProps = () => {
    let res = [];

    res.push({
      ...filter.status,
      maxWidth: 300,
      type: 'dropdown',
    });
    res.push({
      ...filter.regional,
      maxWidth: 300,
      type: 'dropdown',
    });
    res.push({
      ...filter.product,
      maxWidth: 300,
      type: 'dropdown',
      isSearchable: true,
    });

    return res;
  };

  const listProps = {
    noMargin: true,
    noPadding: true,
    filter: filterProps(),
    search: {
      placeholder: 'Search Service ID or Order ID or Service Location..',
      withTooltip: true,
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
      schema: tableHeader['service'],
      useOrderBy,
      useOrderDirection,
      onPaginationChange: onPaginationChange,
    },
  };

  const schema = [
    {
      type: 'custom',
      style: { marginTop: '8px', padding: '8px 32px !important' },
      title: 'List of Service',
      render: (
        <Grid>
          <Summary loading={loading.summary} schema={summarySchema} />
          <List {...listProps} />
        </Grid>
      ),
    },
  ];

  return <DetailGenerator data={schema} />;
};

ServiceList.defaultProps = {
  data: {},
};

ServiceList.propTypes = {
  data: PropTypes.object,
};

export default React.memo(ServiceList);
