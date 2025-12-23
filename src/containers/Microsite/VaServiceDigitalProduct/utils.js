import React from 'react';
import { dateFormatConverter } from '@utils/converter';
import { maskDigitalProductStatus } from './utilsStatus';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import { dateFormat } from '@utils/parser';
import { capitalize } from '@utils/text';

const generateWorklogNote = (
  { note, noteProgress, description, file },
  onPreviewWorklog,
  onPreviewMulti,
) => {
  if (noteProgress && file?.length > 0) {
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
        <Box display="block">
          <Typography color="general-mid" variant="caption">
            See&nbsp;
          </Typography>
          <Typography
            color="blue-main"
            onClick={
              file?.length > 1
                ? onPreviewMulti(file)
                : onPreviewWorklog(file ? file[0] : {})
            }
            style={{ cursor: 'pointer' }}
            variant="caption"
          >
            attachment here.
          </Typography>
        </Box>
      </>
    );
  } else if (noteProgress) {
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
      </>
    );
  } else {
    return note || description || '';
  }
};

export const worklogMapping = (
  { historyWorklog },
  onPreviewWorklog,
  onPreviewMulti,
) =>
  historyWorklog
    ?.map(
      ({
        dateTime,
        status: _status,
        description,
        evidence,
        note,
        noteProgress,
      }) => {
        if (!dateTime) {
          return null;
        }

        const status = maskDigitalProductStatus(_status);

        return {
          date: dateFormat({ date: dateTime, type: 'date-time-full' }),
          note: generateWorklogNote(
            { note, noteProgress, description, file: evidence },
            onPreviewWorklog,
            onPreviewMulti,
          ),
          status: status,
        };
      },
    )
    .reverse()
    .filter((d) => !!d);

const stepperMapping = (data) => {
  let errors = undefined;
  let errorsLabel = undefined;

  const steps = data?.worklog.map((item) => {
    return {
      createdBy: item.createdBy,
      note: item.note,
      noteProgress: item.noteProgress,
      status: item.status,
      step: item.step,
      label: capitalize(item.status),
    };
  });

  const lengthWorklog = data?.worklog?.length;
  const lastStep =
    data?.worklog
      ?.slice()
      .reverse()
      .findIndex((d) => !!d.dateTime) || 0;
  let active = lengthWorklog - lastStep;

  if (lastStep < 0) {
    active = 0;
  } else if (lastStep <= 2) {
    active = active - 1;
  }

  if (['Rejected', 'Report Rejected'].includes(steps[1]?.label)) {
    errors = 'rejected';
    errorsLabel = 'Report Rejected';
    active = 1;

    const stepRejected = steps.filter(
      (item) => item.status !== 'Rejected' && item.status !== 'Report Rejected',
    );
    return {
      steps: stepRejected,
      active,
      errors,
      errorsLabel,
    };
  }

  return {
    steps,
    active,
    errors,
    errorsLabel,
  };
};

export const neucloudWorklog = ({ historyWorklog }, onPreviewWorklog) =>
  historyWorklog
    ?.map(({ dateTime, status: _status, note }) => {
      const status = maskDigitalProductStatus(_status);

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note }, onPreviewWorklog),
        status: status,
      };
    })
    .reverse()
    .filter(({ date }) => !!date);

const vaServiceDetailSchema = (data, other) => [
  {
    gridProps: { xs: 12, md: 6 },
    content: [
      {
        type: 'information',
        title: 'Ticket Detail',
        properties: {
          data: data || {},
          schema: [
            { name: 'referenceId', label: 'Reference ID' },
            { name: 'ticketId', label: 'Ticket Number' },
            { name: 'productName', label: 'Product Name' },
            {
              name: 'createdAt',
              label: 'Created Date',
              converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
            },
            {
              name: 'dataCustomerAccount.custAccntName',
              label: 'COMPANY NAME',
            },
            { name: 'ttr', label: 'TTR (TIME TO RESPOND)' },
          ],
        },
      },
      {
        type: 'information',
        title: 'Report Description',
        properties: {
          data: data || {},
          schema: [
            { name: 'troubleType', label: 'TROUBLE TYPE' },
            { name: 'troubleDesc', label: 'TROUBLE DESCRIPTION' },
          ],
        },
      },
      {
        type: 'attachment',
        title: 'Evidence',
        hidden: !data?.evidenceFiles?.length,
        properties: {
          data: data || [],
          schema: [{ name: 'evidenceFiles', label: '' }],
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
        title: 'Fault Handling Step',
        properties: stepperMapping(data),
      },
      {
        type: 'worklog',
        title: 'History Work Log',
        properties: {
          data: worklogMapping(
            data,
            other?.onPreviewWorklog,
            other?.openModalMultiAttachment,
          ),
        },
      },
    ],
  },
];

const vaServiceDataMapping = (data) => ({
  ...data,
  status: maskDigitalProductStatus(data.status),
});

export const detailSchema = (data, other) => {
  if (!data) {
    return [];
  }

  const schema = {
    vaservice: vaServiceDetailSchema(data, other),
  }[data?.product];

  return schema;
};

export const dataMapping = (data) => {
  if (!data) {
    return null;
  }

  const schema = {
    vaservice: vaServiceDataMapping(data),
  }[data?.product];

  return schema;
};

export const getSuccessMessageNeucloud = (type) => {
  return {
    Add: 'Ticket number successfully added',
    Edit: 'Ticket number successfully updated',
    UpdateStatus: 'Issue status succesfully updated',
  }[type];
};
