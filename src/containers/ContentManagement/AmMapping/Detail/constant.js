export const breadcrumb = () => [
  {
    label: 'Account Manager Mapping',
    url: '/am-mapping',
  },
  { label: 'Account Manager Detail' },
];

export const tableHeader = [
  { id: 'corporateClientName', label: 'CUSTOMER' },
  { id: 'custAccntNum', label: 'CUSTOMER ACCOUNT NUMBER' },
  // { id: 'productName', label: 'PRODUCT', sort: true },
  { id: 'action', label: 'ACTION' },
];

export const actionButton = ({ push }) => [
  {
    children: 'Cancel',
    noDivider: true,
    onClick: () => push('/am-mapping'),
    variant: 'ghost',
  },
];

export const schema = [
  {
    // cellStyle: { minWidth: 150 },
    label: 'CUSTOMER',
    name: 'corporateClientName',
  },
  {
    // cellStyle: { minWidth: 150 },
    label: 'CUSTOMER ACCOUNT NUMBER',
    name: 'custAccntNum',
  },
  {
    // cellStyle: { minWidth: 150 },
    label: 'ACTION',
    name: 'action',
  },
];
