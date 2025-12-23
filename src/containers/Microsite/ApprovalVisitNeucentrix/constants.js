import images from '../../../__old/configs/images';
import { errorTitle as error } from '@constants/static';

export const schema = [
  { name: 'custAccntName', label: 'Customer' },
  { name: 'visitId', label: 'Visit ID' },
  { name: 'picName', label: 'PIC Visitor' },
  { name: 'additionalVisitor', label: 'Additional Visitor', list: true },
  { name: 'purpose', label: 'Visit Purpose' },
  { name: 'location', label: 'Visit Location' },
  {
    name: 'requestVisitDate',
    label: 'Request Visit Date',
    date: true,
    type: 'date-month-year',
  },
  { name: 'visitDate', label: 'Visit Date' },
  { name: 'spk', label: 'SPK Document', previewDocs: true, color: 'blue' },
  { name: 'ba', label: 'BA Document', previewDocs: true, color: 'blue' },
  { name: 'nda', label: 'NDA Document', previewDocs: true, color: 'blue' },
  {
    name: 'additionalfile',
    label: 'Additional Document',
    previewDocs: true,
    color: 'blue',
  },
  { name: 'photo', label: 'Pass Photo', previewDocs: true, color: 'blue' },
];

export const imageStatus = (status) => {
  switch (status) {
    case 'rejected':
      return images.APPROVAL_REJECTED;
    default:
      return images.APPROVAL_SUCCESS;
  }
};

export const errorTitle = {
  ...error,
  403: '403. Sorry, The Link is No Longer Valid',
};
