import React from 'react';
import ActivityHistory from './lib/ActivityHistory';
import Detail from '@fragments/Detail';
import EstimateValue from './lib/EstimateValue';
import Typography from '@components/Typography';
import UpdateStatus from './lib/forms/UpdateStatusForm';
import useAction from './hooks/useActions';
import { dateFormatConverter } from '@utils/converter';
import { route } from '@configs';
import { pickStatus } from './utils';
import {
  getVisitNCXStepper,
  getVisitNCXWorklog,
  schemaActivityHistory,
  boxMessage,
} from './utils';
import AlertFowarded from './lib/AlertFowarded';

const DetailVisitNCX = (props) => {
  const {
    action,
    fetchDetail,
    visitId,
    data,
    loading,
    modalUpdateStatus,
    setModalUpdateStatus,
    tableData,
    hasNotForwarded,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Visiting', url: route.visitNcx('list') },
    { label: visitId },
  ];

  const renderAdditionalVisitor = (visitor = []) => {
    if (!visitor.length) return '-';
    return (
      <ul style={{ paddingLeft: 24, margin: 0 }}>
        {visitor.map((item, i) => (
          <li key={`bdy-det-${item?.name}-${i}`}>
            <Typography
              children={`${item?.name} - ${item?.phoneNumber}`}
              inline
              variant="subtitle1"
            />
          </li>
        ))}
      </ul>
    );
  };

  const detailSchema = [
    {
      gridProps: { xs: 12 },
      hidden: hasNotForwarded,
      content: [
        {
          type: 'custom',
          title: '',
          render: <AlertFowarded data={data?.forwardedTo} />,
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          ...(!hasNotForwarded && {
            style: { marginTop: '0px !important' },
          }),
          type: 'information',
          title: 'Order Information',
          properties: {
            data: data || {},
            schema: [
              { name: 'visitId', label: 'Visit ID' },
              { name: 'companyName', label: 'Company Name' },
              { name: 'picVisitorName', label: 'PIC Visitor' },
              { name: 'picPhoneNumber', label: 'PIC VISITOR PHONE NUMBER' },
              {
                name: 'additionalVisitor',
                label: 'Additional Visitor',
                grid: 12,
                converter: (v) => renderAdditionalVisitor(v),
              },
              { name: 'location', label: 'Location' },
              { name: 'roomName', label: 'Room', hidden: !data?.room },
              { name: 'purpose', label: 'Visit Purpose' },
              {
                name: 'orderDate',
                label: 'ORDER DATE',
                converter: dateFormatConverter({
                  type: 'full-string-date',
                  empty: '-',
                }),
              },
              { name: 'visitDate', label: 'Visit Date' },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data || {},
            schema: [
              {
                name: 'spk',
                label: 'SPK',
              },
              {
                name: 'ba',
                label: 'BA',
              },
              {
                name: 'nda',
                label: 'NDA',
              },
              {
                name: 'additionalfile',
                label: 'ADDITIONAL FILE',
              },
              {
                name: 'swab',
                label: 'Swab/PCR',
              },
              {
                name: 'vaccine',
                label: 'Vaccine',
              },
              {
                name: 'ktp',
                label: 'PHOTO KTP',
              },
              {
                name: 'photo',
                label: 'PASS PHOTO',
              },
            ],
          },
        },
        ...(tableData?.length
          ? [
              {
                type: 'custom',
                title: 'Visit Activity History',
                render: (
                  <ActivityHistory
                    data={tableData}
                    schema={schemaActivityHistory}
                    visitId={visitId}
                  />
                ),
              },
            ]
          : []),
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      stickRight: true,
      content: [
        ...(boxMessage[data?.status]?.title
          ? [
              {
                type: 'custom',
                title: boxMessage[data?.status]?.title,
                render: (
                  <EstimateValue
                    loading={loading}
                    value={data?.rejectReason}
                    variant={boxMessage[data?.status]?.variant}
                  />
                ),
              },
            ]
          : []),
        {
          type: 'stepper',
          title: 'Order Step',
          properties: {
            ...getVisitNCXStepper(data?.status),
            steps: ['Checking', 'Approved', 'Visiting', 'Visit Completed'],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getVisitNCXWorklog(data?.worklog),
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
        schema={detailSchema}
        status={pickStatus[data?.status]}
      />
      <UpdateStatus
        fetchDetail={fetchDetail}
        id={visitId}
        modalUpdateStatus={modalUpdateStatus}
        setModalUpdateStatus={setModalUpdateStatus}
      />
    </>
  );
};

export default DetailVisitNCX;
