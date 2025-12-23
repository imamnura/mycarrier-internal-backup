import React from 'react';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import { statusLabel, statusVariant } from './utils';

const NonBulkDetail = (props) => {
  const { data, loading, orderNumber } = useAction(props);

  const breadcrumb = [
    { label: 'Non Bulk', url: route.nonBulk('list') },
    { label: orderNumber, url: route.nonBulk('detail', orderNumber) },
    { label: 'View Details' },
  ];

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'level2',
          title: 'Campaign Order',
          properties: {
            data: [
              {
                type: 'information',
                title: 'Receiver Profile',
                titleVariant: 'h5',
                properties: {
                  data: data,
                  schema: [
                    { name: 'location', label: 'LOCATION', grid: 12 },
                    { name: 'age', label: 'AGE' },
                    { name: 'ARPU', label: 'ARPU' },
                    { name: 'religion', label: 'RELIGION' },
                    { name: 'gender', label: 'GENDER' },
                  ],
                },
              },
              {
                type: 'information',
                title: 'Message Delivery',
                titleVariant: 'h5',
                properties: {
                  data: data,
                  schema: [
                    { name: 'sfId', label: 'SALESFORCE ID', grid: 12 },
                    { name: 'quantity', label: 'Quantity' },
                    {
                      name: 'smsPerDayLocation',
                      label: 'SMS PER DAY LOCATION',
                    },
                    { name: 'campaignDate', label: 'CAMPAIGN DATE', grid: 12 },
                  ],
                },
              },
              {
                type: 'information',
                title: 'Message Content',
                titleVariant: 'h5',
                properties: {
                  data: data,
                  schema: [{ name: 'wording', label: 'WORDING', grid: 12 }],
                },
              },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          hidden: data?.isProduct !== 'MMS',
          properties: {
            data: data,
            schema: [
              {
                name: 'documentAttachment',
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        action={[]}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema(data)}
        status={{
          children: statusLabel[data?.status],
          variant: statusVariant[statusLabel[data?.status]],
        }}
      />
    </>
  );
};

export default NonBulkDetail;
