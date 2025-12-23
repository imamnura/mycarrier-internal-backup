import React from 'react';
import ReadMore from '@__old/components/elements/ReadMore';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

const formatMTTR = (v) => {
  if (!v) {
    return '0';
  }
  return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const schemaApproval = [
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Reference Id',
    name: 'referenceId',
  },
  {
    cellStyle: {
      minWidth: 130,
    },
    label: 'Ticket Source',
    name: 'source',
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'Response Time',
    name: 'responseTime',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'Ticket Date',
    name: 'ticketDate',
  },
  {
    cellStyle: {
      minWidth: 140,
    },
    label: 'Sold DTP',
    name: 'soldDTP',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'OLO',
    name: 'olo',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Service ID',
    name: 'serviceId',
  },
  {
    cellStyle: {
      minWidth: 250,
    },
    label: 'Address',
    name: 'address',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Product',
    name: 'productName',
  },
  {
    cellStyle: {
      minWidth: 250,
    },
    label: 'Description',
    name: 'description',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'PIC Name',
    name: 'picName',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'PIC Contact',
    name: 'picPhoneNumber',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      DRAFT: 'primary',
      APPROVED: 'success',
      REJECTED: 'danger',
    },
  },
];

const normalizeApproval = (data) =>
  data.map((d) => ({
    ...d,
    responseTime: `${d.responseTime} minutes`,
    ticketDate: dateFormat({ date: d.ticketDate, type: 'date-time' }),
    approvalDate: dateFormat({ date: d.approvalDate, type: 'date-time' }),
    address:
      d.address?.length > 90 ? (
        <ReadMore
          readMoreCharacterLimit={90}
          showLessButton={true}
          text={d.address}
        />
      ) : (
        d.address
      ),
    description:
      d.description?.length > 90 ? (
        <ReadMore
          readMoreCharacterLimit={90}
          showLessButton={true}
          text={d.description}
        />
      ) : (
        d.description
      ),
    status: d.status,
  }));

const schemaOnProgress = [
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Reference Id',
    name: 'referenceId',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Ticket Source',
    name: 'source',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Ticket Number',
    name: 'ticketNumber',
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'Response Time',
    name: 'responseTime',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Ticket Date',
    name: 'ticketDate',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Approval Date',
    name: 'approvalDate',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Completion Date',
    name: 'dateCompletion',
  },
  {
    cellStyle: {
      minWidth: 130,
    },
    label: 'Ticket Aging (minute)',
    name: 'mttr',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'OLO',
    name: 'olo',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Service ID',
    name: 'serviceId',
  },
  {
    cellStyle: {
      minWidth: 250,
    },
    label: 'Address',
    name: 'address',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Product',
    name: 'productName',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'PIC Name',
    name: 'picName',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      DRAFT: 'primary',
      APPROVED: 'success',
      REJECTED: 'danger',
    },
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Progress',
    name: 'progress',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Reviewer',
    name: 'reviewer',
  },
];

const schemaClosed = [
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Reference Id',
    name: 'referenceId',
  },
  {
    cellStyle: {
      minWidth: 130,
    },
    label: 'Ticket Source',
    name: 'source',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Ticket Number',
    name: 'ticketNumber',
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'Response Time',
    name: 'responseTime',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Ticket Date',
    name: 'ticketDate',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Approval Date',
    name: 'approvalDate',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Completion Date',
    name: 'dateCompletion',
  },
  {
    cellStyle: {
      minWidth: 130,
    },
    label: 'Ticket Aging (minute)',
    name: 'mttr',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'OLO',
    name: 'olo',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Service ID',
    name: 'serviceId',
  },
  {
    cellStyle: {
      minWidth: 250,
    },
    label: 'Address',
    name: 'address',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Product',
    name: 'productName',
  },
  {
    cellStyle: {
      minWidth: 250,
    },
    label: 'REASON OF REJECT',
    name: 'reasonReject',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'Document',
    name: 'document',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'PIC Name',
    name: 'picName',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Status',
    name: 'status',
    schemaStatus: {
      DRAFT: 'primary',
      APPROVED: 'success',
      REJECTED: 'danger',
    },
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Progress',
    name: 'progress',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'Reviewer',
    name: 'reviewer',
  },
];

const normalizeClosed = (data, actions) =>
  data.map((d) => ({
    ...d,
    responseTime: `${d.responseTime} minutes`,
    ticketDate: dateFormat({ date: d.ticketDate, type: 'date-time' }),
    approvalDate: dateFormat({ date: d.approvalDate, type: 'date-time' }),
    dateCompletion: dateFormat({ date: d.dateCompletion, type: 'date-time' }),
    address:
      d.address?.length > 90 ? (
        <ReadMore
          readMoreCharacterLimit={90}
          showLessButton={true}
          text={d.address}
        />
      ) : (
        d.address
      ),
    reasonReject:
      d.reasonReject?.length > 90 ? (
        <ReadMore
          readMoreCharacterLimit={90}
          showLessButton={true}
          text={d.reasonReject}
        />
      ) : (
        d.reasonReject
      ),
    document: d.fileEvidence?.fileName ? (
      <Typography
        children={d.fileEvidence?.fileName}
        color="blue-main"
        onClick={async (e) => {
          e.stopPropagation();
          await actions.setEvidenceFile({
            fileUrl: d.fileEvidence?.fileUrl,
            fileName: d.fileEvidence?.fileName,
          });

          if (d.fileEvidence?.fileType === 'pdf') {
            actions.setOpenPreview(true);
          } else {
            window.location.href = d.fileEvidence?.fileUrl;
          }
        }}
        style={{ cursor: 'pointer' }}
        variant="subtitle2"
      />
    ) : (
      '-'
    ),
    status: normalizeStatus(d.status),
    mttr: formatMTTR(d.mttr),
  }));

export const progressOptions = [
  { label: 'All Status', value: '' },
  { label: 'Report Issued', value: 'Approved' },
  { label: 'Fault Analysis', value: 'Queued' },
  { label: 'Fault Handling', value: 'Backend' },
  { label: 'Fault Completion', value: 'Finalchecked' },
  // { label:  'Report Completed', value: 'Closed' },
  // { label:  'Report Rejected', value: 'Rejected' },
];

export const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

export const schemaList = (activeTab) => {
  return (
    {
      approval: schemaApproval,
      onProgress: schemaOnProgress,
      closed: schemaClosed,
    }[activeTab] || []
  );
};

const normalizeStatus = (status) => {
  return (
    {
      APPROVE: 'APPROVED',
      REJECT: 'REJECTED',
    }[status] || status
  );
};

export const normalizeList = (data, tab, actions) => {
  return (
    {
      approval: normalizeApproval(data),
      onProgress: normalizeClosed(data, actions),
      closed: normalizeClosed(data, actions),
    }[tab] || data
  );
};
