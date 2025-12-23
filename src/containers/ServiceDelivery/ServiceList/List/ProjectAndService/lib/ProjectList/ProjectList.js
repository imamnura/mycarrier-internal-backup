import React from 'react';
import PropTypes from 'prop-types';
import { DetailGenerator } from '@fragments/Detail';
import List from '@fragments/List';
import useActions from './hooks/useActions';
import { tableHeader } from '../../utils';

const ProjectList = (props) => {
  const {
    list,
    loading,
    onBottomPage,
    onClickRowTable,
    search,
    setSearch,
    useOrderBy,
    useOrderDirection,
  } = useActions(props);

  const listProps = {
    noMargin: true,
    noPadding: true,
    onBottomPage: onBottomPage,
    search: {
      placeholder: 'Search Project ID..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: list.data,
      loadingRoot: loading.tableRoot,
      loading: loading.tableRow,
      meta: list.meta,
      onClickRow: onClickRowTable,
      schema: tableHeader['project'],
      useOrderBy,
      useOrderDirection,
    },
  };

  const schema = [
    {
      type: 'custom',
      title: 'List of Project',
      style: { marginTop: '8px', padding: '8px 16px !important' },
      render: (
        <div style={{ paddingTop: '16px' }}>
          <List {...listProps} />
        </div>
      ),
    },
  ];

  return <DetailGenerator data={schema} />;
};

ProjectList.defaultProps = {
  data: {},
};

ProjectList.propTypes = {
  data: PropTypes.object,
};

export default React.memo(ProjectList);
