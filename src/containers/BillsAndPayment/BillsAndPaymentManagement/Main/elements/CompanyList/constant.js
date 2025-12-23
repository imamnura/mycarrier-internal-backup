export const tableHeader = [
  {
    cellStyle: {
      maxWidth: 64,
      minWidth: 64,
      width: 64,
      position: 'sticky',
      left: 0,
    },
    label: 'No',
    name: 'number',
  },
  {
    cellStyle: {
      minWidth: 278,
      width: 278,
      position: 'sticky',
      left: 64,
    },
    label: 'Customer',
    name: 'companyName',
  },
  {
    cellStyle: {
      minWidth: 130,
      width: 130,
      position: 'sticky',
      left: 64 + 278,
      borderRight: `4px solid #B3C3CA`,
    },
    label: 'BP Number',
    name: 'bpNumber',
  },
  {
    cellStyle: {
      minWidth: 450,
      width: 450,
    },
    label: 'Address',
    name: 'companyAddress',
  },
  {
    cellStyle: {
      minWidth: 50,
      width: 50,
    },
    label: 'AGING',
    name: 'aging',
  },
  {
    cellStyle: {
      minWidth: 250,
      width: 250,
    },
    label: 'PROFILLING BY ASSESSMENT',
    name: 'profByAssessment',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'COMMIT STATUS',
    name: 'commitStatus',
  },
  {
    cellStyle: {
      minWidth: 250,
      width: 200,
    },
    label: 'CUSTOMER TYPE BY ASSESSMENT',
    name: 'typeByAsessment',
  },
  {
    cellStyle: {
      minWidth: 180,
      width: 180,
    },
    label: 'Last Update',
    name: 'lastFetchInvoice',
  },
  {
    label: '',
    name: 'invoiceClaimOnProgress',
  },
];

export const optionsProfileByAssessment = [
  { label: 'All Profile by Assessment', value: '' },
  { label: 'Low Risk', value: 'Low Risk' },
  { label: 'Medium Risk', value: 'Medium Risk' },
  { label: 'High Risk', value: 'High Risk' },
];
