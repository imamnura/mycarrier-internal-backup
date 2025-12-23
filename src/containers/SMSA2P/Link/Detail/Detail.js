import React from 'react';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import {
  statusLabel,
  statusVariant,
  getLinkStepper,
  getLinkWorklog,
  boxMessage,
} from './utils';
import { dateFormatConverter } from '@utils/converter';
import EstimateValue from '@components/EstimateValue';
import UpdateStatusForm from '@components/Form/UpdateStatus';

const DetailLink = (props) => {
  const {
    data,
    loading,
    orderNumber,
    action,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchDetail,
    fetchUpdateStatus,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Link', url: route.link('list') },
    { label: orderNumber || '-' },
  ];

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Order Information',
          properties: {
            data: data,
            schema: [
              { name: 'orderNumber', label: 'Order Number' },
              { name: 'customer', label: 'Customer Name', grid: 12 },
              {
                name: 'createdAt',
                label: 'Order Date',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'Link Activation Order',
          properties: {
            data: data,
            schema: [
              { name: 'category', label: 'Link Category' },
              { name: 'ip', label: 'IP Customer' },
              {
                name: 'activeDate',
                label: 'Active On',
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
      gridProps: { xs: 12, md: 6 },
      stickRight: true,
      content: [
        {
          type: 'custom',
          hidden: !boxMessage[data?.activationStatus]?.title,
          title: boxMessage[data?.activationStatus]?.title,
          render: (
            <EstimateValue
              loading={loading}
              value={data?.rejectReason}
              variant={boxMessage[data?.activationStatus]?.variant}
            />
          ),
        },
        {
          type: 'stepper',
          title: 'Order Step',
          properties: {
            ...getLinkStepper(data?.activationStatus),
            steps: [
              'Customer Request',
              'Approval AM',
              'Checking Order',
              'Customer Review',
              'Complete',
            ],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getLinkWorklog(data?.worklog),
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
          children: statusLabel[data?.activationStatus],
          variant: statusVariant[statusLabel[data?.activationStatus]],
        }}
      />
      <UpdateStatusForm
        content={modalUpdateStatus}
        fetchDetail={fetchDetail}
        fetchUpdateStatus={fetchUpdateStatus}
        setContent={setModalUpdateStatus}
      />
    </>
  );
};

export default DetailLink;
