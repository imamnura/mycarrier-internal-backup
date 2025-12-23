import { orderLineStatusVariant, serviceStatusVariant } from '../utils';

export const schemaServiceList = [
  {
    label: (
      <p>
        <strong>Service ID</strong>
      </p>
    ),
    name: 'serviceId',
    cellStyle: {
      minWidth: 180,
    },
  },
  {
    label: (
      <p>
        <strong>Product/Service</strong>
      </p>
    ),
    name: 'productName',
  },
  {
    label: 'Last Update',
    name: 'lastUpdate',
    formatDate: 'date-time',
    sort: true,
  },
  {
    label: 'Order Line Item Status',
    name: 'orderLineStatus',
    schemaStatus: orderLineStatusVariant,
  },
  {
    label: 'Delivery Steps',
    name: 'deliveryStep',
    schemaStatus: serviceStatusVariant,
  },
  {
    label: 'Milestone',
    name: 'milestone',
  },
];

export const checkProduct = (productName) => {
  if (['Akses Jasa Call Center'].includes(productName)) return 'call-center';

  if (['Layanan Masking Number'].includes(productName)) return 'masking';

  if (['ITKP'].includes(productName)) return 'itkp';

  if (['Calling Card'].includes(productName)) return 'calling-card';

  return 'MRTG';
};

export const optionsFilterStatus = [
  { label: 'All Status', value: '' },
  { label: 'Submitted', value: 'Submitted' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Pending BASO', value: 'Pending BASO' },
  { label: 'Pending Billing Approval', value: 'Pending Billing Approval' },
  { label: 'Failed', value: 'Failed' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Canceled', value: 'Canceled' },
];
