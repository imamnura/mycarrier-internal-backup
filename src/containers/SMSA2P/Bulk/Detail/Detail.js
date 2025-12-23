import React from 'react';
import { useRouter } from 'next/router';
import Detail from '@fragments/Detail';
import UpdateStatusForm from '@components/Form/UpdateStatus';
import EstimateValue from '@components/EstimateValue';
import useAction from './hooks/useActions';
import { dateFormatConverter } from '@utils/converter';
import { route } from '@configs';
import InputParameter from './lib/InputParameter';
import {
  statusLabel,
  statusVariant,
  getBulkStepper,
  getBulkkWorklog,
  boxMessage,
} from './utils';

const BulkDetail = (props) => {
  const {
    action,
    data,
    loading,
    fetchDetail,
    fetchUpdateStatus,
    orderNumber,
    modalUpdate,
    setModalUpdate,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalInputParams,
    setModalInputParams,
    // confirmation,
    setConfirmation,
    clearConfirmation,
    onCLickDownloadAll,
    onCloseModalNotes: onClose,
  } = useAction(props);

  const {
    query: { id },
  } = useRouter();

  const breadcrumb = [
    { label: 'Bulk', url: route.bulk('list') },
    { label: orderNumber || '-' },
  ];

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Bulk Parameter',
          hidden: !data?.senderId,
          properties: {
            data: data,
            schema: [
              {
                name: 'smscData.cp_name',
                label: 'CP Name',
                hidden: data?.provider !== 'Telkomsel',
              },
              {
                name: 'smscData.sid',
                label: 'SID',
                hidden: data?.provider !== 'Telkomsel',
              },
              { name: 'senderId', label: 'Sender ID' },
            ],
          },
        },
        {
          type: 'information',
          title: 'Order Information',
          properties: {
            data: data,
            schema: [
              { name: 'orderNumber', label: 'Order Number' },
              { name: 'custAccntName', label: 'CUSTOMER' },
              {
                name: 'createdAt',
                label: 'Order Date',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
              },
              { name: 'companyName', label: 'Company' },
              { name: 'branName', label: 'Brand' },
              { name: 'industry', label: 'Industry Category' },
              { name: 'mediaSeller', label: 'Media Seller Account', grid: 12 },
              { name: 'websiteUrl', label: 'Website/Link' },
            ],
          },
        },
        {
          type: 'information',
          title: 'Bulk Activation Order',
          properties: {
            data: data,
            schema: [
              { name: 'provider', label: 'Provider' },
              { name: 'senderId', label: 'Sender ID' },
              { name: 'linkCategoryTypeName', label: 'Service Category' },
              {
                name: 'contentPurpose',
                label: 'Content Purpose',
                inline: true,
              },
              {
                name: 'messageFormat',
                label: 'Message Format',
                lowercase: true,
                grid: 12,
              },
              {
                name: 'messageFormatOtp',
                label: 'Message Format',
                lowercase: true,
                grid: 12,
              },
              { name: 'messageType', label: 'Message Type' },
              {
                name: 'appLaunch',
                label: 'Launch in OS Store (Android/iOS)',
                bool: true,
              },
              { name: 'notes', label: 'Notes', grid: 12 },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          ...(!data?.attachmentDoc?.fileUrl
            ? null
            : {
                action: {
                  children: 'Download All',
                  onClick: onCLickDownloadAll,
                },
              }),
          properties: {
            data: data,
            schema: [
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
            ...getBulkStepper(data?.activationStatus),
            steps:
              data?.activationStatus.toLowerCase() === 'suspend'
                ? [
                    'Customer Request',
                    'Checking Telkom',
                    'Checking Provider',
                    'Input Parameter',
                    'Completed',
                    'Suspend',
                  ]
                : [
                    'Customer Request',
                    'Checking Telkom',
                    'Checking Provider',
                    'Input Parameter',
                    'Completed',
                  ],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getBulkkWorklog(data?.worklog),
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

      <InputParameter
        clearConfirmation={clearConfirmation}
        detail={data}
        id={id}
        onClose={onClose}
        open={modalInputParams || modalUpdate}
        setConfirmation={setConfirmation}
        setModalInputParams={setModalInputParams}
        setModalUpdate={setModalUpdate}
        updateStatus={fetchUpdateStatus}
      />
    </>
  );
};

export default BulkDetail;
