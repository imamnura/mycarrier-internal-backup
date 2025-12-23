import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Table from '@components/Table';
import { schemaMTTR } from '../../utils';
import useActions from './hooks/useActions';

const MTTR = (props) => {
  const { list, loading, page, onPaginationChange } = useActions(props);

  const tableProps = {
    data: list.data,
    loadingRoot: loading.table,
    loading: false,
    meta: list.meta,
    page,
    onPaginationChange: onPaginationChange,
    schema: schemaMTTR,
    emptyMessage: {
      description: 'The data will appear automatically if get an update',
      message: 'Data not found',
      size: 'small',
    },
    size: 5,
    maxHeight: 346,
    customStyles: {
      pageInformation: {
        flexWrap: 'no-wrap',
      },
    },
  };

  return (
    <Box pt={3}>
      <Table {...tableProps} />
    </Box>
  );
};

MTTR.defaultProps = {
  data: {},
};

MTTR.propTypes = {
  data: PropTypes.object,
};

export default MTTR;
