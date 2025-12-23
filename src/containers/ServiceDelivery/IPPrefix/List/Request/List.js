import React from 'react';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import List from '@fragments/List';
import Status from '@components/Status';
import { route } from '@configs';
import { dateFormatConverter } from '@utils/converter';
import { schema, statusLabel, statusVariant } from './utils';

const RequestMRTGDetail = (props) => {
  const {
    data,
    loading,
    search,
    setSearch,
    list,
    filterStatus,
    setFilterStatus,
    onClickRowTable,
    loadingTable,
    onPaginationChange,
    page,
  } = useAction(props);

  const breadcrumb = [
    { label: 'IP Prefix', url: route.ipPrefix('list-customer') },
    { label: data?.custAccntName },
  ];

  const filter = () => {
    let filters = [];

    filters.push({
      onChange: setFilterStatus,
      options: [
        { label: 'All Status', value: '' },
        { label: 'EOS Approval', value: 'eos approval' },
        { label: 'On Progress', value: 'on progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Returned', value: 'returned' },
      ],
      type: 'dropdown',
      value: filterStatus,
    });

    return filters;
  };

  const tableData = list.data.map((item) => ({
    ...item,
    status: (
      <Status
        children={statusLabel[item?.status]}
        variant={statusVariant[statusLabel[item?.status]]}
      />
    ),
  }));

  const listProps = {
    noMargin: true,
    noPadding: true,
    filter: filter(),
    search: {
      placeholder: 'Search Request ID or Origin ASN...',
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
    },
  };

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Customer Detail',
          properties: {
            data: data,
            schema: [
              { name: 'custAccntName', label: 'Customer', grid: 12 },
              {
                name: 'lastUpdate',
                label: 'Last Update',
                grid: 12,
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12 },
      content: [
        {
          type: 'custom',
          title: 'IP Prefix',
          render: <List {...listProps} />,
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema(data)}
      />
    </>
  );
};

export default RequestMRTGDetail;
