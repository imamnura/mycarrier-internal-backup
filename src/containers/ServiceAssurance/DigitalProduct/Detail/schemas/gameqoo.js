import Score from '@components/Score';
import SymptomList from '../elements/SymptomList';

import { dateFormatConverter } from '@utils/converter';

import { maskDigitalProductStatus } from '../../utils';
import { stepperMapping, worklogMapping } from '../utils';
import gameqooStepper from '../steppers/gameqoo';

export const gameqooDetailSchema = (data, other) => [
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
              label: 'Created Date',
              name: 'createdAt',
              converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
            },
            { name: 'companyName', label: 'COMPANY NAME' },
            { name: 'ttr', label: 'TTR (TIME TO RESPONSE)' },
          ],
        },
      },
      {
        type: 'information',
        title: 'Report Description',
        properties: {
          data: data || {},
          schema: [
            { name: 'voucherCode', label: 'VOUCHER CODE', grid: 12 },
            { name: 'troubleType', label: 'TROUBLE TYPE', grid: 12 },
            { name: 'troubleDesc', label: 'TROUBLE DESCRIPTION', grid: 12 },
          ],
        },
      },
      {
        type: 'information',
        title: 'Salesforce Data',
        hidden: data.status === 'CHECKING' || data?.networkType === 'network',
        properties: {
          data: data || {},
          schema: [
            { name: 'sfCategory', label: 'SALESFORCE CATEGORY' },
            { name: 'sfSubCategory', label: 'SALESFORCE SUBCATEGORY' },
          ],
        },
      },
      {
        type: 'information',
        title: 'Service Information',
        hidden: data?.networkType === 'nonNetwork',
        properties: {
          data: data || {},
          schema: [
            { name: 'referenceId', label: 'Reference ID', grid: 12 },
            { name: 'serviceId', label: 'Service ID' },
            { name: 'ticketId', label: 'Ticket Number' },
            { name: 'firstCall', label: 'First Call Resolution' },
            { name: 'productName', label: 'Product' },
            { name: 'serviceLocation', label: 'Address', grid: 12 },
          ],
        },
      },
      {
        type: 'information',
        title: 'PIC Customer',
        properties: {
          data: data || {},
          schema: [
            { name: 'picName', label: 'PIC Name' },
            { name: 'picPhoneNumber', label: 'PIC Contact' },
            { name: 'picAddress', label: 'PIC Address', grid: 12 },
          ],
        },
      },
      {
        type: 'information',
        title: 'Fault Information',
        hidden: data?.networkType === 'nonNetwork',
        properties: {
          data: data || {},
          schema: [
            { name: 'urgency', label: 'Urgency' },
            { name: 'hardComplaint', label: 'Hard Complain' },
            { name: 'symptompName', label: 'Symptoms', grid: 12 },
            { name: 'descValidation', label: 'Description', grid: 12 },
            { name: 'occNoteValidation', label: `OCC's Note`, grid: 12 },
          ],
        },
      },
      {
        type: 'information',
        title: 'PIC Internal',
        hidden: data?.networkType === 'nonNetwork',
        properties: {
          data: data || {},
          schema: [
            { name: 'picName2', label: 'PIC Name' },
            { name: 'picNumber2', label: 'PIC Contact' },
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
        type: 'information',
        title: 'Net Promoter Score',
        hidden: !data?.score,
        properties: {
          data: data || {},
          schema: [
            { name: 'score', label: 'SCORE', grid: 'auto' },
            { name: 'impressions', label: 'IMPRESSIONS', grid: true },
          ],
        },
      },
      {
        type: 'stepper',
        title: 'Fault Handling Step',
        properties:
          data?.networkType !== 'network'
            ? stepperMapping(data)
            : gameqooStepper(data),
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

export const gameqooDataMapping = (data) => {
  const status = maskDigitalProductStatus(data.status);
  const networkType = data?.networkType || 'nonNetwork';

  return {
    ...data,
    networkType,
    // status: {
    //   network: {
    //     'CLOSED': 'REPORT COMPLETED',
    //   },
    //   nonNetwork: {
    //     'CLOSED': 'REPORT COMPLETED',
    //   }
    // }[networkType][status] || status,
    status,
    defaultStatus: data.status,
    urgency: {
      1: 'Normal',
      2: 'Medium',
      3: 'Hard',
      4: 'Emergency',
    }[data.urgency],
    hardComplaint: {
      1: 'Ramah',
      2: 'Agak Marah',
      3: 'Marah',
    }[data.urgency],
    symptompName: <SymptomList data={data.symptompName} />,
    score: data?.score ? <Score total={10} value={2} /> : null,
  };
};
