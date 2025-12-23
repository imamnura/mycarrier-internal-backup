import { route } from '@configs';
import moment from 'moment';

export const breadcrumb = (bpNumber, count) => [
  { label: 'Bills & Payment Management', url: route.billsAndPayment('list') },
  { label: bpNumber, url: route.billsAndPayment('detail', bpNumber) },
  { label: `Billing Reminder Letter ${count}` },
];

export const schema = [
  {
    cellStyle: {
      minWidth: 240,
      width: 240,
    },
    label: 'Invoice',
    name: 'invoiceNumberFormat',
  },
  {
    cellStyle: {
      minWidth: 100,
      width: 100,
    },
    label: 'Invoice Date',
    name: 'invoiceDate',
    formatDate: 'date',
  },
  {
    cellStyle: {
      minWidth: 160,
      width: 160,
    },
    label: 'Total Bills',
    name: 'invoiceBill',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 160,
      width: 160,
    },
    label: 'Already Paid',
    name: 'invoicePaid',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 160,
      width: 160,
    },
    label: 'Outstanding Balance',
    name: 'invoiceOsBalance',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 100,
      width: 100,
    },
    label: 'Due Dates',
    name: 'invoiceDueDate',
    formatDate: 'date',
  },
  // {
  //   cellStyle: {
  //     minWidth: 200,
  //     width: 200
  //   },
  //   label: 'Document',
  //   name: 'document'
  // }
];

export const filterMonthOptions = [
  { label: 'All Month', value: '' },
  ...moment.months().map((monthName, i) => {
    return { value: String(`0${i + 1}`.slice(-2)), label: monthName };
  }),
];

export const filterYearOptions = () => {
  let startYear = moment().year() + 1;

  const output = [];

  for (let i = 5; i > 0; i = i - 1) {
    startYear -= 1;
    output.push(`${startYear}`);
  }

  return [
    { label: 'All Year', value: '' },
    ...output.map((year) => ({ label: year, value: year })),
  ];
};
