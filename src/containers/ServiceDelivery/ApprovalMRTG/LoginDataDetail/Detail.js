import React from 'react';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import { statusLabel, statusVariant } from './utils';
import { dateFormatConverter } from '@utils/converter';
import AddLoginDataForm from './lib/AddLoginDataForm';

const NonBulkDetail = (props) => {
  const {
    data,
    loading,
    customerAccountNumber,
    loginDataId,
    modalAddLoginData,
    setModalAddLoginData,
    fetchDetail,
    action,
  } = useAction(props);

  const breadcrumb = [
    { label: 'MRTG', url: route.mrtg('list') },
    {
      label: data?.customerAccountName || customerAccountNumber,
      url: route.mrtg('detail', customerAccountNumber),
    },
    { label: loginDataId },
  ];

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Login Data Detail',
          properties: {
            data: data,
            schema: [
              { name: 'loginDataId', label: 'REQUEST ID', grid: 12 },
              { name: 'username', label: 'USERNAME', grid: 12 },
              { name: 'password', label: 'PASSWORD', grid: 12 },
              {
                name: 'createdAt',
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
              { name: 'note', label: 'NOTES', grid: 12 },
            ],
          },
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
      <AddLoginDataForm
        fetchDetail={fetchDetail}
        id={loginDataId}
        modalAddLoginData={modalAddLoginData}
        setModalAddLoginData={setModalAddLoginData}
      />
    </>
  );
};

export default NonBulkDetail;
