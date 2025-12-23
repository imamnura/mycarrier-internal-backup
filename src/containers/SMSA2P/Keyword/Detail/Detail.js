import React from 'react';
import Detail from '@fragments/Detail';
import UpdateStatusForm from '@components/Form/UpdateStatus';
import EstimateValue from '@components/EstimateValue';
import useAction from './hooks/useActions';
import { route } from '@configs';
import { dateFormatConverter } from '@utils/converter';
import {
  statusLabel,
  statusVariant,
  getKeywordStepper,
  getKeywordWorklog,
  boxMessage,
} from './constant';

const KeywordDetail = (props) => {
  const {
    action,
    data,
    fetchDetail,
    fetchUpdateStatus,
    loading,
    orderNumber,
    modalUpdateStatus,
    setModalUpdateStatus,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Keyword', url: route.keyword('list') },
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
              { name: 'custAccntName', label: 'CUSTOMER' },
              {
                name: 'orderDate',
                label: 'Order Date',
                grid: 12,
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data,
            schema: [
              {
                name: 'document',
                file: true,
                type: 'PDF',
              },
              {
                name: 'appointmentLetter',
                file: true,
                type: 'PDF',
                label: 'Appointment Letter',
              },
              {
                name: 'approvalLetter',
                file: true,
                type: 'PDF',
                label: 'Approval Letter',
              },
              {
                name: 'formMember',
                file: true,
                type: 'PDF',
                label: 'Form Member',
              },
              { name: 'NPWP', file: true, type: 'PDF', label: 'NPWP' },
              {
                name: 'documentOjk',
                file: true,
                type: 'PDF',
                label: 'Dokumen OJK',
              },
              {
                name: 'additionalDoc',
                file: true,
                type: 'PDF',
                label: 'Additional File',
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
            ...getKeywordStepper(data?.activationStatus),
            steps: ['Customer Request', 'Checking Order', 'Completed'],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getKeywordWorklog(data?.worklog),
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

export default KeywordDetail;
