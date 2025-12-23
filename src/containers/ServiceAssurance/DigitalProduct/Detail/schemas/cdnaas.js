import Score from '@components/Score';
import { dateFormatConverter } from '@utils/converter';
import { maskDigitalProductStatus } from '../../utils';
import { stepperMapping, worklogMapping } from '../utils';

export const cdnaasDetailSchema = (data, other) => [
  {
    gridProps: { xs: 12, md: 6 },
    content: [
      {
        type: 'information',
        title: 'Trouble Description',
        properties: {
          data: data || {},
          schema: [
            { name: 'referenceId', label: 'Reference ID' },
            { name: 'productName', label: 'Product Name' },
            { name: 'companyName', label: 'COMPANY NAME' },
            {
              name: 'createdAt',
              label: 'Created Date',
              converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
            },
            { name: 'troubleType', label: 'Trouble Type' },
            { name: 'subTroubleType', label: 'Sub Trouble Type' },
            { name: 'troubleDesc', label: 'Trouble Description', grid: 12 },
            { name: 'address', label: 'Address' },
          ],
        },
      },
      {
        type: 'information',
        title: 'PIC Customer',
        properties: {
          data: data || {},
          schema: [
            { name: 'picName', label: 'Full Name' },
            { name: 'picPhoneNumber', label: 'Phone Number' },
          ],
        },
      },
      {
        type: 'information',
        title: 'PIC Internal',
        hidden: !data?.picInternal?.fullName,
        properties: {
          data: data.picInternal || {},
          schema: [
            { name: 'fullName', label: 'Name' },
            { name: 'phoneNumber', label: 'Phone Number'},
            { name: 'email', label: 'Email' },
          ],
        },
      },
      {
        type: 'information',
        title: 'Fault Information',
        hidden: !data?.faultInformation?.urgency,
        properties: {
          data: data.faultInformation || {},
          schema: [
            { name: 'urgency', label: 'Urgency', grid: 12 },
            { name: 'description', label: 'Description', grid: 12 },
            { name: 'occNotes', label: 'OCC Notes', grid: 12 },
          ],
        },
      },
      {
        type: 'information',
        title: 'Report',
        hidden: !data?.report?.rootCause,
        properties: {
          data: data.report || {},
          schema: [
            { name: 'rootCause', label: 'Root Cause' },
            { name: 'action', label: 'Action' },
          ],
        },
      },
      {
        type: 'attachment',
        title: 'Evidence',
        hidden:
          !data?.evidenceFiles?.internal?.length &&
          !data?.evidenceFiles?.customer?.length &&
          !data?.evidenceFiles?.solved?.length &&
          !data?.evidenceFiles?.closed?.length &&
          !data?.evidenceFiles?.returned?.length,
        properties: {
          data: data || [],
          schema: [
            {
              name: 'evidenceFiles.internal',
              label: 'INTERNAL SUBMITTED EVIDENCE',
            },
            {
              name: 'evidenceFiles.customer',
              label: 'CUSTOMER SUBMITTED EVIDENCE',
            },
            { name: 'evidenceFiles.solved', label: 'SOLVED EVIDENCE' },
            { name: 'evidenceFiles.closed', label: 'CLOSED EVIDENCE' },
            { name: 'evidenceFiles.returned', label: 'RETURNED EVIDENCE' },
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
        type: 'information',
        title: 'Net Promoter Score',
        hidden: !data?.nps?.score,
        properties: {
          data: data?.nps || {},
          schema: [
            { name: 'score', label: 'SCORE', grid: 'auto' },
            { name: 'impressions', label: 'IMPRESSIONS', grid: 'auto' },
            { name: 'comments', label: 'COMMENTS', grid: 12 },
          ],
        },
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
          data: worklogMapping(data, other?.onPreviewWorklog, false),
        },
      },
    ],
  },
];

export const cdnaasDataMapping = (data) => ({
  ...data,
  status: maskDigitalProductStatus(data.status),
  nps: {
    ...data?.nps,
    score: data?.nps?.score ? (
      <Score total={10} value={data?.nps?.score} />
    ) : null,
  },
});
