import PriorityField from '../elements/PriorityField';

import { dateFormatConverter } from '@utils/converter';

import { maskDigitalProductStatus } from '../../utils';
import { stepperMapping, worklogMapping } from '../utils';

// LEGACY - netmonkDetailSchema - no longer used (change to file _base)
// last usage : July 15th 2024
// note : can be use again when there's a need for custom
export const netmonkDetailSchema = (data, other) => [
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
            { name: 'companyName', label: 'COMPANY NAME' },
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
            { name: 'subTroubleType', label: 'SUB TROUBLE TYPE' },
            { name: 'troubleDesc', label: 'TROUBLE DESCRIPTION' },
            { name: 'address', label: 'ADDRESS' },
            { name: 'regional', label: 'REGIONAL' },
            { name: 'priority', label: 'PRIORITY' },
            { name: 'assignee', label: 'ASSIGNEE' },
          ],
        },
      },
      {
        type: 'information',
        title: 'Salesforce Data',
        hidden: !['nonNetwork'].includes(data?.networkType),
        properties: {
          data: data || {},
          schema: [
            { name: 'sfCategory', label: 'SALESFORCE CATEGORY' },
            { name: 'sfSubCategory', label: 'SALESFORCE SUBCATEGORY' },
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
          data: worklogMapping(data, other?.onPreviewWorklog, true),
        },
      },
    ],
  },
];

export const netmonkDataMapping = (data) => ({
  ...data,
  status: maskDigitalProductStatus(data.status),
  priority: <PriorityField priority={data?.priority} />,
});
