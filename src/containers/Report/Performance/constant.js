import color from '../../../styles/color';

export const tableHeader = (tab) => {
  switch (tab) {
    case 'po':
      return [
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'ORDER ID',
          name: 'orderNumber',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'ORDER TYPE',
          name: 'orderType',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'CUSTOMER',
          name: 'customer',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'BAKES NUMBER',
          name: 'bakesNumber',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'PRODUCT NAME',
          name: 'product',
        },
        {
          label: 'Status',
          name: 'status',
          schemaStatus: {
            'AM Approval': 'primary',
            'AM Returned': 'danger',
            Approved: 'success',
            Checking: 'warning',
            'Customer Returned': 'danger',
            'Delivery Approval': 'primary',
            'Delivery Approved': 'success',
            Rejected: 'danger',
            Returned: 'danger',
            'WDS Approval': 'primary',
            'WDS Approved': 'success',
          },
        },
      ];
    case 'baso':
      return [
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'ORDER NUMBER',
          name: 'orderNumber',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'SID',
          name: 'sid',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'ORDER TYPE',
          name: 'orderType',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'CUSTOMER',
          name: 'customer',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'ACCOUNT MANAGER',
          name: 'accountManager',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'SEGMENT',
          name: 'segment',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'PRODUCT',
          name: 'product',
        },
        {
          label: 'STATUS',
          name: 'status',
          schemaStatus: {
            'AM Returned': 'danger',
            'BASO Completed': 'success',
            'BASO Rejected': 'danger',
            'BASO Returned': 'danger',
            'Customer Sign': 'warning',
          },
        },
      ];
    case 'visitNCX':
      return [
        {
          cellStyle: {
            minWidth: 100,
            width: 180,
          },
          label: 'Visit ID',
          name: 'visitId',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'Company Name',
          name: 'companyName',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'PIC Visitor',
          name: 'picVisitor',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'CUSTOMER TYPE',
          name: 'customerType',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'Location',
          name: 'location',
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          formatDate: 'date',
          label: 'Order Date',
          name: 'orderDate',
        },
        {
          cellStyle: {
            minWidth: 150,
            width: 150,
          },
          label: 'Visit Date',
          name: 'visitDate',
        },
        {
          label: 'Status',
          name: 'status',
          schemaStatus: {
            Checking: 'warning',
            Visiting: 'primary',
            'Visit Completed': 'success',
            Approved: 'primary',
            Rejected: 'danger',
          },
        },
      ];
    default:
      return null;
  }
};

export const pickLabel = {
  approvalMyC: 'Approval MyCarrier',
  approvalVam: 'Approval VAM',
  approvalTotal: 'Approval Total',
};

export const optionsFilterType = [
  { value: '', label: 'All Data' },
  { value: 'mycarrier', label: 'MyCarrier' },
  { value: 'blitz', label: 'Blitz' },
];

export const optionsFilterReportTime = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export const optionsFilterVisitPurpose = [
  { value: '', label: 'All Visiting Purpose' },
  { value: 'survey', label: 'Survey' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'urgent case', label: 'Urgent Case' },
];

export const legendsBarTimeApprove = [
  { label: 'Approval Mycarrier', color: '#3071D9', variant: 'bar' },
  { label: 'Approval VAM', color: '#FAB005', variant: 'bar' },
  { label: 'Total Approval', color: '#3BA064', variant: 'bar' },
];

export const defaultPalette = [
  color.blue.main,
  color.yellow.main,
  color.primary.mid,
  color.primary.main,
  color.green.main,
  color.orange.main,
  color.purple.soft,
  color.green.soft,
  color.blue.soft,
  color.yellow.soft,
  color.orange.soft,
];

export const currentDate = new Date();

export const mtdDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1,
);

export const ytdDate = new Date(currentDate.getFullYear(), 0, 1);
