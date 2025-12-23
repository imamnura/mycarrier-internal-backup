import SearchFile from '@assets/ilustration-v2/SearchFile';
import List from '@fragments/List';
import React from 'react';
import useActions from './hooks/useActions';
import { schema } from './utils';
import { Text } from '@legion-ui/core';

const LineItems = (props) => {
  const { list, loadingTable, useCollapseChild, status } = useActions(props);

  const listProps = {
    noMargin: true,
    noPadding: true,
    // breadcrumb: [{ label: 'Line Items', color: 'general-mid' }],
    table: {
      meta: { totalPage: 0 },
      useCollapseChild,
      numbering: false,
      data: list,
      size: 5,
      loading: false,
      loadingRoot: loadingTable,
      emptyMessage: {
        description: `${status} Number is not currently created`,
        message: `Line Items doesn't exist yet`,
        icon: SearchFile,
      },
      schema: schema(status),
    },
  };

  return (
    <>
      <Text children="Line Items" size="20px" weight="700" color="secondary500" />
      <List {...listProps} />
    </>
  );
};

export default LineItems;
