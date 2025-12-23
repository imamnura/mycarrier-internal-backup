export const tableHeader = [
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'NAME',
    name: 'name',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'EMAIL',
    name: 'email',
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'PRODUCT',
    name: 'product',
  },
  {
    cellStyle: {
      minWidth: 200,
    },
    label: 'SOURCE',
    name: 'source',
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'TYPE OF LOGIN',
    name: 'afterLogin',
  },
  {
    cellStyle: {
      minWidth: 100,
    },
    label: 'NEWSLETTER',
    name: 'allowNewsletter',
  },
  {
    cellStyle: {
      minWidth: 150,
      width: 150,
    },
    formatDate: 'date-time',
    label: 'DATE DOWNLOAD',
    name: 'dateDownload',
  },
];

export const optionsTypeOfLogin = [
  { label: 'All Type of Login', value: '' },
  { label: 'Before Login', value: false },
  { label: 'After Login', value: true },
];

export const optionsNewsletterStatus = [
  { label: 'All Newsletter Status', value: '' },
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];
