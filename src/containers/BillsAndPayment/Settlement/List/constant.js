export const tableHeader = (tab) => {
  switch (tab) {
    case 'users':
      return [
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'USER ID',
          name: 'userId',
        },
        {
          cellStyle: {
            minWidth: 300,
            width: 300,
          },
          label: 'EMAIL',
          name: 'email',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'PRODUCT',
          name: 'product',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'VMS TOTAL',
          name: 'totalVm',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'Status',
          name: 'status',
          schemaStatus: {
            Active: 'success',
            'Not Verified': 'warning',
            Suspend: 'danger',
          },
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'BILLING TYPE',
          name: 'billingType',
          schemaStatus: {
            postpaid: 'alert',
            prepaid: 'warning',
          },
        },
      ];
    case 'settlement':
      return [
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'SETTLEMENT ID',
          name: 'settlementId',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'USER ID',
          name: 'userId',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'COMPANY NAME',
          name: 'companyName',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'EMAIL',
          name: 'email',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'PRODUCT',
          name: 'product',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Period',
          name: 'periodSettlement',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'VMS USAGE',
          name: 'vmUsage',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'Status',
          name: 'statusSettlement',
          schemaStatus: {
            COMPLETED: 'success',
            'SETTLEMENT COMPLETED': 'alert',
            'AM SEND NDE': 'warning',
            RETURNED: 'danger',
            'CUSTOMER APPROVAL': 'warning',
            'AM SEND MOM': 'warning',
            'NDE APPROVAL': 'warning',
            'NDE REJECTED': 'danger',
            'NDE RETURNED': 'danger',
            'NDE APPROVED': 'primary',
          },
        },
      ];
    default:
      return [];
  }
};

export const optionsFilterStatus = (tab) => {
  const status = [{ value: '', label: 'All Status' }];

  const statusTabRequest = [
    { label: 'Customer Request', value: 'customerrequest' },
    { label: 'Checking Order', value: 'approval_provider' },
    { label: 'Customer Review', value: 'customerreview' },
  ];

  const statusTabActive = [
    { label: 'Completed', value: 'completed' },
    { label: 'Rejected', value: 'rejected' },
  ];

  if (tab === 'progress') status.push(...statusTabRequest);
  else status.push(...statusTabActive);

  return status;
};
