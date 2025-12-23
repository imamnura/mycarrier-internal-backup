export const tabOptions = [
  { value: 'evaluate', label: 'Evaluate' },
  { value: 'activate', label: 'Activate' },
  { value: 'getSupport', label: 'Get Support' },
  // { value: 'pay', label: 'Pay' },
];

// export const tableSelectedRowKey = (activeTab) => {
//   switch (activeTab) {
//     case 'evaluate': return 'bakesId';
//     case 'activate': return 'orderNumber';
//     case 'getSupport': return '';
//     case 'pay': return '';
//   }
// };

export const schemaDetailRootCause = (title) => [
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
      minWidth: 200,
      width: 200,
      position: 'sticky',
      left: 64,
    },
    label: 'Status Follow Up',
    name: 'statusValidate',
    hidden: title === 'NEED VALIDATION',
    schemaStatus: {
      'not yet': 'primary',
      'on progress': 'warning',
      onprogress: 'warning',
      completed: 'success',
    },
  },
  {
    cellStyle: {
      maxWidth: 200,
      minWidth: 200,
      position: 'sticky',
      left: 64 + (title === 'NEED VALIDATION' ? 0 : 200),
    },
    label: 'Rate Id',
    name: 'rateId',
  },
  {
    cellStyle: {
      maxWidth: 200,
      minWidth: 200,
      position: 'sticky',
      left: 64 + 200 + (title === 'NEED VALIDATION' ? 0 : 200),
    },
    label: 'journey',
    name: 'journey',
  },

  {
    cellStyle: {
      maxWidth: 200,
      minWidth: 200,
      position: 'sticky',
      left: 64 + 200 + 200 + (title === 'NEED VALIDATION' ? 0 : 200),
      borderRight: `4px solid #B3C3CA`,
    },
    label: 'customer',
    name: 'custAccntName',
  },
  {
    cellStyle: {
      minWidth: 140,
      width: 140,
    },
    label: 'Rate',
    name: 'npsRate',
  },
  {
    cellStyle: {
      minWidth: 140,
      width: 140,
    },
    label: 'Date',
    name: 'createdAt',
    formatDate: 'date',
  },
  {
    cellStyle: {
      minWidth: 140,
      width: 140,
    },
    label: 'Note NPS',
    name: 'noteNps',
  },
  {
    cellStyle: {
      minWidth: 200,
      width: 200,
    },
    label: 'Note Improvement',
    name: 'noteImprovement',
  },
  {
    cellStyle: {
      minWidth: 140,
      width: 140,
    },
    label: 'Root Cause',
    name: 'rootCause',
    hidden: title === 'NEED VALIDATION',
  },
  {
    cellStyle: {
      minWidth: 140,
      width: 140,
    },
    label: 'Follow Up',
    name: 'followUp',
    hidden: title === 'NEED VALIDATION',
  },
  {
    cellStyle: {
      minWidth: 140,
      width: 140,
    },
    label: 'Due Dates',
    name: 'npsDueDate',
  },
  {
    label: 'Worklog',
    name: 'actionWorklog',
    hidden: title === 'NEED VALIDATION',
  },
];

export const tableHeader = (journey, isModal = false, tab = '') => {
  const widthStatusValidate = tab === 'needValidation' ? 0 : 200;

  const check = isModal
    ? [
        {
          cellStyle: {
            maxWidth: 64,
            minWidth: 64,
            width: 64,
            position: 'sticky',
            left: 0,
          },
          label: 'Valid',
          name: 'status',
        },
      ]
    : [];

  const number = [
    {
      cellStyle: {
        maxWidth: 64,
        minWidth: 64,
        width: 64,
        position: 'sticky',
        left: 64,
      },
      label: 'No',
      name: 'number',
    },
    {
      cellStyle: {
        minWidth: 200,
        width: 200,
        position: 'sticky',
        left: 64 + 64,
      },
      label: 'Status Follow Up',
      name: 'statusValidate',
      hidden: isModal || tab === 'needValidation',
      schemaStatus: {
        'not yet': 'primary',
        'on progress': 'warning',
        onprogress: 'warning',
        completed: 'success',
      },
    },
    {
      cellStyle: {
        minWidth: 200,
        width: 200,
        position: 'sticky',
        left: 64 + 64,
      },
      label: 'Status Follow Up',
      name: 'statusInput',
      hidden: !isModal,
    },
    {
      cellStyle: {
        maxWidth: 200,
        minWidth: 200,
        position: 'sticky',
        left: 64 + 64 + widthStatusValidate,
      },
      label: 'Rate Id',
      name: 'rateId',
    },
  ];

  const addData = [
    {
      cellStyle: {
        minWidth: 200,
        width: 200,
      },
      label: 'Due Dates',
      name: 'npsDueDate',
    },
    {
      cellStyle: {
        minWidth: 140,
        width: 140,
      },
      label: 'Root Cause',
      name: 'rootCauseTrim',
      hidden: tab === 'needValidation' || isModal,
    },
    {
      cellStyle: {
        minWidth: 140,
        width: 140,
      },
      label: 'Root Cause',
      name: 'rootCause',
      hidden: tab === 'needValidation' || !isModal,
    },
    {
      cellStyle: {
        minWidth: 140,
        width: 140,
      },
      label: 'Follow Up',
      name: 'followUp',
      hidden: tab === 'needValidation',
    },
    {
      label: 'Worklog',
      name: 'actionWorklog',
      hidden: tab === 'needValidation',
    },
  ];

  switch (journey) {
    case 'explore': {
      return [
        ...check,
        ...number,
        {
          cellStyle: {
            maxWidth: 200,
            minWidth: 200,
            position: 'sticky',
            left: 64 + 200 + 64 + widthStatusValidate,
          },
          label: 'customer',
          name: 'customer',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
            position: 'sticky',
            left: 64 + 200 + 64 + 200 + widthStatusValidate,
            borderRight: `4px solid #B3C3CA`,
          },
          label: 'PIC Name',
          name: 'name',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Phone Number',
          name: 'phone',
        },
        {
          cellStyle: {
            minWidth: 200,
          },
          label: 'email',
          name: 'email',
        },
        {
          cellStyle: {
            minWidth: 140,
            width: 140,
          },
          label: 'Date time nps',
          name: 'dateTimeNps',
        },
        {
          cellStyle: {
            minWidth: 110,
            width: 110,
          },
          label: 'nps rate',
          name: 'npsRate',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'category',
          name: 'category',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'note nps',
          name: 'noteNps',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'note improvement',
          name: 'noteImprovement',
        },
        ...addData,
      ];
    }
    case 'evaluate': {
      return [
        ...check,
        ...number,
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
            position: 'sticky',
            left: 64 + 200 + 64 + widthStatusValidate,
          },
          label: 'ID',
          name: 'bakesId',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
            position: 'sticky',
            left: 64 + 200 + 64 + 160 + widthStatusValidate,
          },
          label: 'bakes Date',
          name: 'bakesDate',
        },
        {
          cellStyle: {
            minWidth: 240,
            width: 120,
            position: 'sticky',
            left: 64 + 200 + 64 + 160 + 120 + widthStatusValidate,
            borderRight: `4px solid #B3C3CA`,
          },
          label: 'company',
          name: 'company',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'name',
          name: 'name',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Phone Number',
          name: 'phoneNumber',
        },
        {
          cellStyle: {
            minWidth: 200,
          },
          label: 'email',
          name: 'email',
        },
        {
          cellStyle: {
            minWidth: 110,
            width: 110,
          },
          label: 'nps rate',
          name: 'npsRate',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'category',
          name: 'category',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'note nps',
          name: 'noteNps',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'note improvement',
          name: 'noteImprovement',
        },
        ...addData,
      ];
    }
    case 'activate': {
      return [
        ...check,
        ...number,
        {
          cellStyle: {
            minWidth: 240,
            maxWidth: 240,
            width: 240,
            position: 'sticky',
            left: 64 + 200 + 64 + widthStatusValidate,
          },
          label: 'customer',
          name: 'custAccntName',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
            position: 'sticky',
            left: 64 + 200 + 64 + 240 + widthStatusValidate,
            borderRight: `4px solid #B3C3CA`,
          },
          label: 'product',
          name: 'productName',
        },
        {
          cellStyle: {
            minWidth: 180,
          },
          label: 'order number',
          name: 'orderNumber',
        },
        {
          cellStyle: {
            minWidth: 180,
            width: 180,
          },
          label: 'service category',
          name: 'serviceCategory',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'Sender ID',
          name: 'senderId',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'Created activation',
          name: 'createdActivation',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'order date',
          name: 'orderDate',
        },
        {
          cellStyle: {
            minWidth: 190,
            width: 190,
          },
          label: 'Time Delivery Telkom',
          name: 'timeDeliveryTelkom',
        },
        {
          cellStyle: {
            minWidth: 190,
            width: 190,
          },
          label: 'Time Delivery Average',
          name: 'timeDeliveryAvg',
        },
        {
          cellStyle: {
            minWidth: 190,
            width: 190,
          },
          label: 'Time Delivery Tsel',
          name: 'timeDeliveryTsel',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'Username',
          name: 'username',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'Email',
          name: 'email',
        },
        {
          cellStyle: {
            minWidth: 140,
            width: 140,
          },
          label: 'Date time nps',
          name: 'dateTimeNps',
        },
        {
          cellStyle: {
            minWidth: 110,
            width: 110,
          },
          label: 'Rate nps',
          name: 'npsRate',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'note nps',
          name: 'noteNps',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'note improvement',
          name: 'noteImprovement',
        },
        ...addData,
      ];
    }
    case 'getsupport': {
      return [
        ...check,
        ...number,
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
            position: 'sticky',
            left: 64 + 200 + 64 + widthStatusValidate,
          },
          label: 'Ticket ID',
          name: 'ticketId',
        },
        {
          cellStyle: {
            minWidth: 140,
            width: 140,
            position: 'sticky',
            left: 64 + 200 + 64 + 200 + widthStatusValidate,
            borderRight: `4px solid #B3C3CA`,
          },
          label: 'Close Date',
          name: 'ticketCompleted',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'Customer',
          name: 'custAccntName',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'Product',
          name: 'productName',
        },
        {
          cellStyle: {
            minWidth: 120,
          },
          label: 'Name',
          name: 'username',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'Datex',
          name: 'datex',
        },
        {
          cellStyle: {
            minWidth: 200,
          },
          label: 'Email',
          name: 'email',
        },
        {
          cellStyle: {
            minWidth: 140,
            width: 140,
          },
          label: 'Date time nps',
          name: 'createdAt',
        },
        {
          cellStyle: {
            minWidth: 110,
            width: 110,
          },
          label: 'Rate NPS',
          name: 'npsRate',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'Category',
          name: 'category',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'Note NPS',
          name: 'noteNps',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'Note Improvement',
          name: 'noteImprovement',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'Trouble Headline',
          name: 'troubleHeadline',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'TTR Customer',
          name: 'ttrCustomer',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'TTR End to End',
          name: 'ttrEndtoend',
        },
        ...addData,
      ];
    }
    case 'pay': {
      return [
        ...check,
        ...number,
        {
          cellStyle: {
            maxWidth: 120,
            minWidth: 120,
            width: 120,
            position: 'sticky',
            left: 64 + 200 + 64 + widthStatusValidate,
          },
          label: 'invoice number',
          name: 'invoiceNumber',
        },
        {
          cellStyle: {
            minWidth: 120,
            maxWidth: 120,
            width: 120,
            position: 'sticky',
            left: 64 + 200 + 64 + 120 + widthStatusValidate,
          },
          label: 'bp number',
          name: 'bpNumber',
        },
        {
          cellStyle: {
            minWidth: 240,
            maxWidth: 240,
            width: 240,
            position: 'sticky',
            left: 64 + 200 + 64 + 120 + 120 + widthStatusValidate,
            borderRight: `4px solid #B3C3CA`,
          },
          label: 'company',
          name: 'company',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'Phone Number',
          name: 'phoneNumber',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'nps date',
          name: 'npsDate',
        },
        {
          cellStyle: {
            minWidth: 110,
            width: 110,
          },
          label: 'nps rate',
          name: 'npsRate',
        },
        {
          cellStyle: {
            minWidth: 120,
            width: 120,
          },
          label: 'Category',
          name: 'category',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'Note NPS',
          name: 'noteNps',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'Note Improvement',
          name: 'noteImprovement',
        },
        ...addData,
      ];
    }
    case 'use': {
      return [
        ...check,
        ...number,
        {
          cellStyle: {
            maxWidth: 150,
            minWidth: 150,
            width: 150,
            position: 'sticky',
            left: 64 + 200 + 64 + widthStatusValidate,
          },
          label: 'Visit ID',
          name: 'visitId',
        },
        {
          cellStyle: {
            maxWidth: 240,
            minWidth: 240,
            width: 240,
            position: 'sticky',
            left: 64 + 200 + 64 + 150 + widthStatusValidate,
            borderRight: `4px solid #B3C3CA`,
          },
          label: 'company',
          name: 'company',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'PIC Visitor',
          name: 'picVisitor',
        },
        {
          cellStyle: {
            minWidth: 200,
            width: 200,
          },
          label: 'CUSTOMER TYPE',
          name: 'customerType',
        },
        {
          cellStyle: {
            minWidth: 160,
            width: 160,
          },
          label: 'PURPOSE',
          name: 'purpose',
        },
        {
          cellStyle: {
            minWidth: 250,
            mwidth: 250,
          },
          label: 'LOCATION',
          name: 'location',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'ORDER DATE',
          formatDate: 'date-time',
          name: 'orderDate',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'VISIT DATE',
          formatDate: 'date-time',
          name: 'visitDate',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'TIME APPROVAL',
          name: 'approvalTimeTotal',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'DATE TIME NPS',
          formatDate: 'date-time',
          name: 'dateTimeNps',
        },
        {
          cellStyle: {
            minWidth: 160,
          },
          label: 'NPS SCORE',
          name: 'npsRate',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'NOTE NPS',
          name: 'noteNps',
        },
        {
          cellStyle: {
            minWidth: 240,
          },
          label: 'NOTE IMPROVEMENT',
          name: 'noteImprovement',
        },
        ...addData,
      ];
    }
  }
};
