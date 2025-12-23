export const tableHeader = (activeTab) => {
  switch (activeTab) {
    case 'done': {
      return [
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'Customer',
          name: 'custAccntName',
        },
        {
          cellStyle: {
            minWidth: 80,
          },
          label: 'Sender ID',
          name: 'senderId',
        },
        {
          cellStyle: {
            minWidth: 80,
          },
          label: 'Operator',
          name: 'provider',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'Order Number',
          name: 'orderNumber',
        },
        {
          cellStyle: {
            minWidth: 80,
          },
          label: 'Service Category',
          name: 'linkCategoryTypeName',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'CP Name',
          name: 'cp_name',
        },
        {
          cellStyle: {
            minWidth: 80,
          },
          label: 'SID',
          name: 'sid',
        },
        {
          cellStyle: {
            minWidth: 80,
          },
          label: 'Message Type',
          name: 'messageType',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          formatDate: 'date-time',
          label: 'Order Date',
          name: 'createdAt',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          formatDate: 'date-time',
          label: 'Last Update',
          name: 'updatedAt',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'Status',
          name: 'status',
          schemaStatus: {
            'Customer Request': 'primary',
            'Checking Provider': 'warning',
            'Checking Telkom': 'warning',
            'Checking Order': 'warning',
            Returned: 'danger',
            Completed: 'success',
            Rejected: 'danger',
            Suspend: 'danger',
          },
        },
      ];
    }
    case 'onprogress': {
      return [
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'Customer',
          name: 'custAccntName',
        },
        {
          cellStyle: {
            minWidth: 80,
          },
          label: 'Sender ID',
          name: 'senderId',
        },
        {
          cellStyle: {
            minWidth: 80,
          },
          label: 'Operator',
          name: 'provider',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'Order Number',
          name: 'orderNumber',
        },
        {
          cellStyle: {
            minWidth: 80,
          },
          label: 'Service Category',
          name: 'linkCategoryTypeName',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'Content Purpose',
          name: 'contentPurpose',
        },
        {
          cellStyle: {
            minWidth: 80,
          },
          label: 'Message Type',
          name: 'messageType',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          formatDate: 'date-time',
          label: 'Order Date',
          name: 'createdAt',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          formatDate: 'date-time',
          label: 'Last Update',
          name: 'updatedAt',
          sort: true,
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'Status',
          name: 'status',
          schemaStatus: {
            'Customer Request': 'primary',
            'Checking Provider': 'warning',
            'Checking Telkom': 'warning',
            'Checking Order': 'warning',
            'input parameter': 'alert',
            Returned: 'danger',
            Completed: 'success',
            Rejected: 'danger',
          },
        },
      ];
    }
  }
};

export const optionsFilterStatus = (tab) => {
  const status = [{ value: '', label: 'All Status' }];

  const statusTabRequest = [
    { label: 'Customer Request', value: 'checking' },
    { label: 'Checking Telkom', value: 'checking order telkom' },
    { label: 'Checking Provider', value: 'checking order provider' },
    { label: 'Input Parameter', value: 'input parameter' },
    { label: 'Returned', value: 'returned' },
  ];

  const statusTabActive = [
    { label: 'Completed', value: 'completed' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Suspend', value: 'suspend' },
  ];

  if (tab === 'onprogress') status.push(...statusTabRequest);
  else status.push(...statusTabActive);

  return status;
};
