export const tableHeader = {
  project: [
    {
      cellStyle: {
        minWidth: 140,
      },
      label: 'ORDER ID',
      name: 'orderId',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'PROJECT ID',
      name: 'projectId',
    },
    {
      cellStyle: {
        minWidth: 420,
      },
      label: 'PROJECT NAME',
      name: 'projectName',
      sort: true,
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'TOTAL SERVICE',
      name: 'totalService',
    },
    {
      cellStyle: {
        minWidth: 180,
      },
      formatDate: 'date-time',
      label: 'LAST UPDATE',
      name: 'lastUpdate',
      sort: true,
    },
  ],
  service: [
    {
      cellStyle: {
        minWidth: 140,
      },
      label: 'Order ID',
      name: 'orderId',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'Order Type',
      name: 'orderType',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'Service ID',
      name: 'serviceId',
    },
    {
      cellStyle: {
        minWidth: 180,
      },
      label: 'Product & Service',
      name: 'productName',
      sort: true,
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'Regional',
      name: 'regional',
    },
    {
      cellStyle: {
        minWidth: 420,
      },
      label: 'Service Location',
      name: 'serviceLocation',
    },
    {
      cellStyle: {
        minWidth: 180,
      },
      formatDate: 'date-time',
      label: 'Order Date',
      name: 'orderDate',
    },
    {
      cellStyle: {
        minWidth: 180,
      },
      formatDate: 'date-time',
      label: 'LAST UPDATE',
      name: 'lastUpdate',
      sort: true,
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'Status',
      name: 'status',
      schemaStatus: {
        Suspend: 'alert',
        'Request To Open': 'alert',
        Active: 'success',
        'On Delivery': 'primary',
        Disconnect: 'danger',
        Isolated: 'alert',
      },
    },
  ],
};

export const checkProduct = (productName) => {
  if (['Akses Jasa Call Center'].includes(productName)) return 'call-center';

  if (['Layanan Masking Number'].includes(productName)) return 'masking';

  if (['ITKP'].includes(productName)) return 'itkp';

  if (['Calling Card'].includes(productName)) return 'calling-card';

  return 'MRTG';
};
