export const tableHeader = (scIntegrationStatus = false) => {
  let _tableHeader = [
    {
      cellStyle: {
        minWidth: 100,
      },
      label: 'INTERESTED ID',
      name: 'interestId',
    },
    {
      cellStyle: {
        minWidth: 150,
        width: 150,
      },
      formatDate: 'date-time',
      label: 'CREATED DATE',
      name: 'createdAt',
      sort: true,
    },
    {
      cellStyle: {
        minWidth: 200,
      },
      label: 'PRODUCT',
      name: 'productName',
    },
    {
      cellStyle: {
        minWidth: 200,
      },
      label: 'COMPANY NAME',
      name: 'companyName',
    },
    {
      cellStyle: {
        minWidth: 150,
      },
      label: 'SOURCE',
      name: 'source',
    },
    {
      cellStyle: {
        minWidth: 120,
      },
      label: 'STATUS ON MYCARRIER',
      name: 'status',
      schemaStatus: {
        Waiting: 'warning',
        Invalid: 'danger',
        Valid: 'success',
      },
    },
    // {
    //   cellStyle: {
    //     minWidth: 120
    //   },
    //   hasTooltipHeader: true,
    //   label: 'STATUS BY STARCLICK',
    //   name: 'starclickStatus',
    //   schemaStatus: {
    //     'Qualify': 'warning',
    //     'Convert': 'success',
    //     'Delay Convert': 'warning',
    //     'Retire': 'danger',
    //     'Opportunity': 'primary',
    //     'Auto Quote': 'success',
    //     'Drop Quote': 'danger',
    //   },
    //   tooltipHeader: 'Status by Starclick only appears for Connectivity Product'
    // },
  ];
  if (scIntegrationStatus)
    return [
      ..._tableHeader,
      {
        cellStyle: {
          minWidth: 120,
        },
        hasTooltipHeader: true,
        label: 'STATUS BY STARCLICK',
        name: 'starclickStatus',
        schemaStatus: {
          Qualify: 'warning',
          Convert: 'success',
          'Delay Convert': 'warning',
          Retire: 'danger',
          Opportunity: 'primary',
          'Auto Quote': 'success',
          'Drop Quote': 'danger',
        },
        tooltipHeader:
          'Status by Starclick only appears for Connectivity Product',
      },
    ];
  return _tableHeader;
};

export const status = (params) => {
  const type = {
    Waiting: {
      label: 'Waiting',
      variant: 'orange',
      value: 'waiting',
    },
    Invalid: {
      label: 'Invalid',
      variant: 'red',
      value: 'invalid',
    },
    Valid: {
      label: 'Valid',
      variant: 'green',
      value: 'valid',
    },
    Qualify: {
      label: 'Qualify',
      variant: 'orange',
      value: 'qualify',
    },
    Convert: {
      label: 'Convert',
      variant: 'green',
      value: 'convert',
    },
    Delayed_Convert: {
      label: 'Delay Convert',
      variant: 'orange',
      value: 'Delayed_Convert',
    },
    Retire: {
      label: 'Retire',
      variant: 'red',
      value: 'retire',
    },
    Create_Opportunity: {
      label: 'Opportunity',
      variant: 'blue',
      value: 'create_opportunity',
    },
    Auto_Quote: {
      label: 'Auto Quote',
      variant: 'green',
      value: 'auto_quote',
    },
    Drop_Quote: {
      label: 'Drop Quote',
      variant: 'red',
      value: 'drop_quote',
    },
  };
  const label = type[params] ? type[params].label : '';
  const variant = type[params] ? type[params].variant : '';
  return { label, variant };
};

export const optionsStatus = [
  { label: 'All Status On MyCarrier', value: '' },
  { label: 'Waiting', value: 'waiting' },
  { label: 'Invalid', value: 'invalid' },
  { label: 'Valid', value: 'valid' },
];

export const optionsStatusByStarclick = [
  { label: 'All Status By Starclick', value: '' },
  { label: 'Qualify', value: 'qualify' },
  { label: 'Convert', value: 'convert' },
  { label: 'Delay Convert', value: 'Delayed_Convert' },
  { label: 'Retire', value: 'retire' },
  { label: 'Opportunity', value: 'create_opportunity' },
  { label: 'Auto Quote', value: 'auto_quote' },
  { label: 'Drop Quote', value: 'drop_quote' },
];
