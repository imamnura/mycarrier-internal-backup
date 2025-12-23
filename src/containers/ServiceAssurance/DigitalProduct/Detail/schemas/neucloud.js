import { dateFormatConverter } from '@utils/converter';
import { dateFormat } from '@utils/parser';

import { generateWorklogNote, stepperMapping, worklogMapping } from '../utils';
import { maskDigitalProductStatus } from '../../utils';

export const neucloudDetailSchema = (data, other) => [
  {
    gridProps: { xs: 12, md: 6 },
    content: [
      {
        type: 'information',
        title: 'Customer Information',
        properties: {
          data: data || {},
          schema: [
            { name: 'custAccntName', label: 'CUSTOMER' },
            { name: 'usernameTicket', label: 'USERNAME' },
            { name: 'companyName', label: 'COMPANY NAME', grid: 12 },
          ],
        },
      },
      {
        type: 'information',
        title: 'Trouble Description',
        properties: {
          data: data || {},
          schema:
            data?.status === 'CHECKING' || data?.status === 'REPORT CHECKING'
              ? [
                  { name: 'ticketId', label: 'TICKET NUMBER' },
                  { name: 'referenceId', label: 'REFERENCE ID' },
                  {
                    name: 'createdAt',
                    label: 'CREATED DATE',
                    converter: dateFormatConverter({
                      type: 'date-time',
                      empty: '-',
                    }),
                  },
                  { name: 'ttr', label: 'TTR (TIME TO RESPOND)' },
                  { name: 'troubleType', label: 'TROUBLE TYPE' },
                  { name: 'departmentType', label: 'DEPARTMENT TYPE' },
                  {
                    name: 'troubleDesc',
                    label: 'TROUBLE DESCRIPTION',
                    grid: 12,
                  },
                ]
              : [
                  { name: 'ticketId', label: 'TICKET NUMBER' },
                  { name: 'referenceId', label: 'REFERENCE ID' },
                  {
                    name: 'createdAt',
                    label: 'CREATED DATE',
                    converter: dateFormatConverter({
                      type: 'date-time',
                      empty: '-',
                    }),
                  },
                  { name: 'ttr', label: 'TTR (TIME TO RESPOND)' },
                  { name: 'troubleType', label: 'TROUBLE TYPE' },
                  { name: 'priority', label: 'Priority Level' },
                  {
                    name: 'departmentType',
                    label: 'DEPARTMENT TYPE',
                    grid: 12,
                  },
                  {
                    name: 'troubleDesc',
                    label: 'TROUBLE DESCRIPTION',
                    grid: 12,
                  },
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
        // properties: neucloudStepper(data)
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

// LEGACY - neucloudDataMapping - no longer used (change to file _base)
// last usage : July 15th 2024
// note : can be use again when there's a need for custom
export const neucloudDataMapping = (data) => ({
  ...data,
  status: maskDigitalProductStatus(data.status),
});

// LEGACY - neucloudDataMapping - no longer used
// last usage : July 15th 2024
// note : can be use again when there's a need for custom
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
