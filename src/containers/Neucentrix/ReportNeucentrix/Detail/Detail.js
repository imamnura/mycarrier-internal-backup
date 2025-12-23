import React from 'react';
import { useRouter } from 'next/router';
import AddCompanyName from './forms/AddCompanyName';
import Reupload from './forms/Reupload';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import {
  statusLabel,
  statusVariant,
  getReportNcxWorklog,
  getReportNcxStepper,
} from './constant';
import { route } from '@configs';
import { dateFormatConverter } from '@utils/converter';

const ReportNeucentrixDetail = (props) => {
  const {
    query: { id },
  } = useRouter();

  const {
    action,
    data,
    clearConfirmation,
    reportId,
    fetchDetail,
    loading,
    modalAddCompany,
    modalReupload,
    setModalReupload,
    setModalAddCompany,
    setConfirmation,
    onClickReupload,
    onCloseModalAddCompany: onClose,
  } = useActions(props);

  const breadcrumb = [
    { label: 'Report Neucentrix', url: route.reportNcx('list') },
    { label: reportId || '-' },
  ]

  const detailSchema = (data) => [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Company Detail',
          properties: {
            data: data,
            schema: [
              { name: 'reportId', label: 'Report ID', grid: 12 },
              { name: 'createdAt', label: 'Upload Date', converter: dateFormatConverter({ type: 'date-time', empty: '-'}), },
              { name: 'updatedAt', label: 'Last Update', converter: dateFormatConverter({ type: 'date-time', empty: '-'}), },
              { name: 'note', label: 'Note', grid: 12 },
            ]
          }
        },
        {
          type: 'numbering',
          title: 'Company Name',
          properties: {
            data: data?.companyInfo,
            nameKey: 'companyName'
          }
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data,
            schema: [
              {
                name: 'documents',
                file: true,
                type: 'PDF',
                label: 'Monthly Report Doc',
                action: {
                  children: 'Reupload',
                  onClick: onClickReupload,
                }
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
          type: 'stepper',
          title: 'Order Step',
          properties: {
            ...getReportNcxStepper(data?.status),
            steps: [
              'Creating Report',
              'Forwarded to WDM',
              'Send to Customer',
            ],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getReportNcxWorklog(data?.worklog),
          },
        },
      ],
    },
  ]

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
      <AddCompanyName
        clearConfirmation={clearConfirmation}
        fetchDetail={fetchDetail}
        id={id}
        onClose={onClose}
        modalAddCompany={modalAddCompany}
        setConfirm={setConfirmation}
        setModalAddCompany={setModalAddCompany}
      />
      <Reupload
        data={data}
        clearConfirmation={clearConfirmation}
        fetchDetail={fetchDetail}
        id={id}
        onClose={onClose}
        modalReupload={modalReupload}
        setConfirm={setConfirmation}
        setModalReupload={setModalReupload}
      />
    </>
  );
}

export default ReportNeucentrixDetail;
