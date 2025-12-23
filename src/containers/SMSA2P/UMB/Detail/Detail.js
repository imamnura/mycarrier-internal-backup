import React from 'react';
import Detail from '@fragments/Detail';
import useAction from './hooks/useActions';
import { route } from '@configs';
import {
  statusLabel,
  statusVariant,
  getUmbStepper,
  getUmbWorklog,
  boxMessage,
} from './utils';
import { dateFormatConverter } from '@utils/converter';
import EstimateValue from '@components/EstimateValue';
import UpdateStatusForm from '@components/Form/UpdateStatus';

const DetailUMB = (props) => {
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
    { label: 'UMB', url: route.umb('list') },
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
              { name: 'custAccntName', label: 'Customer Name' },
              {
                name: 'orderDate',
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
            ...getUmbStepper(data?.activationStatus),
            steps: ['Customer Request', 'Checking Order', 'Complete'],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getUmbWorklog(data?.worklog),
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

export default DetailUMB;
