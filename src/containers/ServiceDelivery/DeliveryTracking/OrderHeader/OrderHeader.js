import _ from 'lodash';
import React from 'react';
import { route } from '@configs';
import Detail from '@fragments/Detail';
import List from '@fragments/List';
import Summary from './lib/Summary';
import { schema } from './utils';
import useAction from './hooks/useAction';

const OrderHeader = (props) => {
  const {
    custAccntNum,
    customerData,
    filter,
    filterStatus,
    setFilterStatus,
    search,
    setSearch,
    list,
    loading,
    loadingTable,
    page,
    onClickRowTable,
    onPaginationChange,
    useOrderBy,
    useOrderDirection,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Delivery Tracking', url: route.deliveryTracking('list') },
    { label: custAccntNum },
  ];

  const tableData = list?.data?.map((v) => ({
    ...v,
    orderHeaderStatus: v?.orderHeaderStatus?.toLowerCase(),
  }));

  const orderHeaderListProps = {
    filter,
    noPadding: true,
    noMargin: true,
    search: {
      placeholder: 'Search Order ID ...',
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
      schema: schema,
      onPaginationChange: onPaginationChange,
      useOrderBy,
      useOrderDirection,
    },
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'information',
          title: 'Customer Information',
          properties: {
            data: customerData,
            schema: [
              { name: 'custAccntName', label: 'Customer', grid: 6 },
              { name: 'custAccntNum', label: 'CA Number', grid: 6 },
              { name: 'address', label: 'Address', grid: 12 },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          title: 'Summary Order Header Status',
          render: (
            <>
              <Summary
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
              <List {...orderHeaderListProps} />
            </>
          ),
        },
      ],
    },
  ];

  return (
    <Detail
      breadcrumb={breadcrumb}
      loading={loading}
      notFound={!customerData || _.isEmpty(customerData)}
      schema={detailSchema}
    />
  );
};

export default OrderHeader;
