import React from 'react';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import { dateFormatConverter } from '@utils/converter';
import List from '@fragments/List';
import { statusLabel, statusVariant, tableHeader } from './constant';
import MessageInfo from './lib/MessageInfo';
import UpdateStatusForm from './lib/forms/UpdateStatusForm';

const RequestMRTGDetail = (props) => {
  const {
    data,
    loading,
    customerAccountNumber,
    requestId,
    search,
    setSearch,
    list,
    action,
    fetchDetail,
    modalUpdateStatus,
    setModalUpdateStatus,
    loadingTable,
    onPaginationChange,
    page,
  } = useAction(props);

  const breadcrumb = [
    { label: 'MRTG', url: route.mrtg('list') },
    {
      label: data?.customerAccountName || customerAccountNumber,
      url: route.mrtg('detail', customerAccountNumber),
    },
    { label: requestId },
  ];

  const tableData = list.data.map((item) => ({
    ...item,
  }));

  const listProps = {
    noMargin: true, 
    noPadding: true,
    search: {
      placeholder: 'Search Service ID..',
      value: search,
      onChange: setSearch,
    },
    table: {
      data: tableData,
      loadingRoot: loadingTable,
      loading: false,
      meta: list.meta,
      page,
      schema: tableHeader,
      onPaginationChange: onPaginationChange,
    },
    withTopDivider: false,
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
              { name: 'requestId', label: 'REQUEST ID', grid: 12 },
              {
                name: 'activatedDate',
                label: 'REQUEST DATE',
                grid: 12,
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
              {
                name: 'lastUpdate',
                label: 'LAST UPDATE',
                grid: 12,
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
              { name: 'noteRequest', label: 'NOTES', grid: 12 },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'custom',
          render: <MessageInfo data={data} />,
        },
      ],
    },
    {
      gridProps: { xs: 12 },
      content: [
        {
          type: 'custom',
          title: 'List of MRTG Service',
          render: <List {...listProps} />,
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema(data)}
        status={{
          children: statusLabel[data?.status],
          variant: statusVariant[statusLabel[data?.status]],
        }}
      />
      <UpdateStatusForm
        fetchDetail={fetchDetail}
        id={requestId}
        modalUpdateStatus={modalUpdateStatus}
        setModalUpdateStatus={setModalUpdateStatus}
      />
    </>
  );
};

export default RequestMRTGDetail;
