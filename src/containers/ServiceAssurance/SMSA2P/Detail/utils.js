import React from 'react';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import { dateFormat } from '@utils/parser';
import { capitalize } from '@utils/text';
import { dateFormatConverter } from '@utils/converter';
import { maskSmsa2pStatus } from '../utils';
import color from '@styles/color';
import Attachment from './elements/Attachment';
import Evidence from './elements/Evidence';
import MSISDNList from './elements/MSISDNList';
import Nps from './elements/NPS';

export const breadcrumb = (id) => [
  { label: 'SMS A2P', url: '/dashboard/service-assurance/smsa2p' },
  { label: id },
];

const checkRating = (worklog) => {
  const findRating = worklog?.find((v) => Boolean(v.rating));

  return Boolean(findRating?.rating?.value);
};

export const stepChoice = (status) => {
  const getStatus =
    {
      checking: 0,
      onprogress: 1,
      returned: 1,
      customerreview: 2,
      completed: 4,
      rejected: 0,
    }[status] || 0;

  return getStatus;
};

const stepperMapping = (data) => {
  let errors = undefined;
  let errorsLabel = undefined;

  const steps = data?.worklog?.map((item) => {
    return {
      createdBy: item.createdBy,
      note: item.note,
      noteProgress: item.noteProgress,
      status: item.status,
      step: item.step,
      label: capitalize(maskSmsa2pStatus(item.status)),
    };
  });

  const lengthWorklog = data?.worklog?.length;
  const lastStep =
    data?.worklog
      ?.slice()
      .reverse()
      .findIndex((d) => !!d.dateTime) || 0;
  let active =
    data?.status === 'checking'
      ? lengthWorklog - lastStep - 1
      : lengthWorklog - lastStep;

  if (lastStep < 0) {
    active = 0;
  } else if (lastStep <= 2) {
    active = active - 1;
  }

  if (steps) {
    if (['Rejected'].includes(steps[3]?.label)) {
      errors = 'rejected';
      errorsLabel = 'Rejected';
      active = 0;

      return {
        steps,
        active,
        errors,
        errorsLabel,
      };
    }
  }

  return {
    steps,
    active,
    errors,
    errorsLabel,
  };
};

const generateWorklogNote = (
  { note, noteProgress, description, file },
  onPreviewWorklog,
) => {
  if (noteProgress || file?.fileUrl) {
    return (
      <>
        {note && (
          <Typography
            children={note || description}
            color="general-mid"
            variant="caption"
          />
        )}
        {noteProgress && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{noteProgress}&rdquo;
            </Typography>
          </Box>
        )}
        {file?.fileUrl && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              See&nbsp;
            </Typography>
            <Typography
              color="blue-main"
              onClick={onPreviewWorklog(file)}
              style={{ cursor: 'pointer' }}
              variant="caption"
            >
              attachment here.
            </Typography>
          </Box>
        )}
      </>
    );
  } else {
    return note || description || '';
  }
};

const worklogLabel = {
  Validasi: 'OCC TELKOM DWS | INCIDENT',
  checking: 'CUSTOMER',
  onprogress: 'OCC TELKOM DWS | INCIDENT',
  customerreview: 'OCC TELKOM DWS | INCIDENT',
  completed: 'OCC TELKOM DWS | INCIDENT',
  reject: 'OCC TELKOM DWS | REJECTED',
  rejected: 'OCC TELKOM DWS | REJECTED',
  returned: 'CUSTOMER',
};

export const worklogMapping = (data, onPreviewWorklog) => {
  if (data?.worklog) {
    return data?.worklog
      ?.map(
        ({
          dateTime,
          status,
          description,
          file,
          note: _note,
          noteProgress,
        }) => {
          if (!dateTime) {
            return null;
          }

          let note = _note;

          if (status === 'rejected') {
            note = `Request ${status}`;
          } else if (Array.isArray(_note)) {
            note = _note[0];
          }

          return {
            date: dateFormat({ date: dateTime, type: 'date-time-full' }),
            note: generateWorklogNote(
              {
                noteProgress,
                description,
                file,
                note,
              },
              onPreviewWorklog,
            ),
            status: worklogLabel[status],
          };
        },
      )
      .reverse()
      .filter((d) => !!d);
  }
};

const troubleDescRegular = [
  { label: 'Ticket Number', name: 'ticketId' },
  { label: 'Service Category', name: 'category' },
  { label: 'Trouble Type', name: 'symtompsName' },
  { label: 'Provider', name: 'operatorTypeName' },
  { label: 'Sender ID', name: 'senderTypeName' },
  {
    label: 'Created Date',
    name: 'createdAt',
    converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
  },
];

const troubleDescLBATargeted = [
  { label: 'Ticket Number', name: 'ticketId' },
  { label: 'Service Category', name: 'category' },
  { label: 'Trouble Type', name: 'symtompsName' },
  { label: 'Provider', name: 'operatorTypeName' },
  { label: 'Sender ID', name: 'senderTypeName' },
  {
    label: 'Created Date',
    name: 'createdAt',
    converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
  },
  { label: 'Description', name: 'description' },
];

const troubleDescLink = [
  { label: 'Ticket Number', name: 'ticketId' },
  { label: 'Service Category', name: 'category' },
  { label: 'Trouble Type', name: 'symtompsName' },
  { label: 'IP Customer', name: 'ipCustomer', type: 'troubleOccursLink' },
  {
    label: 'Created Date',
    name: 'createdAt',
    converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
  },
  {
    label: 'Log Ping/Trace',
    name: 'logPingTrace',
    type: 'troubleOccursLink',
  },
  { label: 'Description', name: 'description' },
];

export const detailSchema = (data, other) => {
  return [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Customer Information',
          properties: {
            data: data || {},
            schema: [
              { name: 'custAccName', label: 'Customer' },
              { name: 'picName', label: 'Contact Person' },
              { name: 'picPhoneNumber', label: 'Phone Number' },
              { name: 'picEmail', label: 'Email' },
            ],
          },
        },
        {
          type: 'information',
          title: 'Trouble Description',
          properties: {
            data: data || {},
            schema: {
              Reguler: troubleDescRegular,
              Premium: troubleDescRegular,
              'LBA Targeted': troubleDescLBATargeted,
              LBA: troubleDescLink,
            }[data?.category] || [
              { label: 'Ticket Number', name: 'ticketId' },
              { label: 'Service Category', name: 'category' },
              { label: 'Trouble Type', name: 'symtompsName' },
              { label: 'IP Customer', name: 'troubleOccursLink.ipCustomer' },
              {
                label: 'Created Date',
                name: 'createdAt',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
                grid: 12,
              },
              {
                label: 'Log Ping/Trace',
                name: 'troubleOccursLink.logPingTrace',
                grid: 12,
              },
            ],
          },
        },
        data?.troubleOccurs?.length > 0 &&
          (data?.category === 'Reguler' || data?.category === 'Premium') && {
            type: 'custom',
            title:
              typeof data?.troubleOccursFile === 'object'
                ? 'MSISDN File'
                : 'MSISDN List',
            render: <MSISDNList data={data} key="msisdn" />,
          },
        !data?.troubleOccursFile &&
          (data?.category === 'LBA Targeted' || data?.category === 'LBA') && {
            type: 'custom',
            title: 'Attachment',
            render: <Attachment data={data} key="attach" />,
          },
        data?.status !== 'checking' &&
          data?.evidenceAttachment?.length !== 0 &&
          data?.status !== 'rejected' && {
            type: 'custom',
            title: 'Evidence',
            render: <Evidence data={data} key="evidence" />,
          },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      stickRight: true,
      content: [
        data?.status === 'completed' &&
          checkRating(data?.worklog) && {
            type: 'custom',
            title: 'Net Promoter Score',
            render: <Nps data={data} />,
          },
        data?.status === 'rejected' &&
          Boolean(data?.rejectReason) && {
            type: 'custom',
            title: 'Message Rejected',
            render: (
              <div
                style={{
                  backgroundColor: color.primary.soft,
                  border: `1px solid ${color.primary.main}`,
                  borderRadius: 8,
                  color: color.primary.main,
                  margin: '24px',
                  padding: 24,
                  textAlign: 'center',
                  width: '90%',
                }}
              >
                {data?.rejectReason}
              </div>
            ),
          },
        {
          type: 'stepper',
          title: 'Fault Handling Step',
          properties: stepperMapping(data),
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: worklogMapping(data, other?.onPreviewWorklog),
          },
        },
      ],
    },
  ];
};
