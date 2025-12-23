import { dateFormatConverter } from '@utils/converter';

export const tableSchema = ({ type: _type }) => {
  let type = _type;

  if (_type === 'thanksLetter') {
    type = 'billingReminder';
  }

  const schema = {
    invoice: [
      {
        name: 'companyName',
        label: 'COMPANY NAME',
        cellStyle: {
          minWidth: 200,
          width: 200,
        },
      },
      {
        name: 'bpNumber',
        label: 'BP NUMBER',
        cellStyle: {
          minWidth: 120,
          width: 120,
        },
      },
      {
        name: 'periode',
        label: 'PERIOD',
        cellStyle: {
          minWidth: 120,
          width: 120,
        },
      },
      {
        name: 'invoiceNumber',
        label: 'INVOICE NUMBER',
        cellStyle: {
          minWidth: 160,
          width: 160,
        },
      },
      {
        name: 'invoiceBill',
        label: 'INVOICE BILLS',
        currency: true,
        cellStyle: {
          minWidth: 200,
          width: 200,
        },
      },
      {
        formatDate: 'date-time',
        name: 'requestedTime',
        label: 'REQUESTED TIME',
        cellStyle: {
          minWidth: 140,
          width: 140,
        },
      },
      {
        name: 'description',
        label: 'Description',
        cellStyle: {
          minWidth: 140,
          width: 140,
        },
      },
      {
        name: 'status',
        label: 'STATUS',
        schemaStatus: {
          REQUESTED: 'primary',
          'IN PROGRESS': 'warning',
          COMPLETED: 'success',
          'INVOICE COMPLETED': 'success',
          Requested: 'primary',
          'Tax Invoice Created': 'warning',
          'Invoice Created': 'warning',
          'Attachment Created': 'warning',
          'E-Materai Completed': 'warning',
          'Invoice Completed': 'success',
        },
      },
    ],
    billingReminder: [
      {
        name: 'companyName',
        label: 'COMPANY NAME',
        cellStyle: {
          minWidth: 260,
          width: 260,
        },
      },
      {
        name: 'bpNumber',
        label: 'BP NUMBER',
        cellStyle: {
          minWidth: 120,
          width: 120,
        },
      },
      {
        name: 'period',
        label: 'PERIOD',
        cellStyle: {
          minWidth: 120,
          width: 120,
        },
      },
      {
        name: 'logSent',
        label: 'LOG SENT',
        converter: dateFormatConverter({ type: 'date-time', empty: '-' }),
      },
      {
        name: 'status',
        label: 'STATUS',
        cellStyle: {
          width: 100,
        },
        schemaStatus: {
          Sent: 'success',
          'In Progress': 'warning',
          Draft: 'primary',
          Approval: 'alert',
          'Need Approval': 'alert',
          Failed: 'danger',
          Reject: 'danger',
        },
      },
    ],
  };

  return schema[type] || [];
};
