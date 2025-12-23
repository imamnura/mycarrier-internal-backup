export const optionTab = [
  { label: 'Activities' },
  { label: 'Notes' },
  { label: 'Attachments' },
  { label: 'Product' },
  { label: 'Contact' },
  { label: 'Quote' },
];

export const steps = (status, isRetireWithoutQualify) => {
  if (isRetireWithoutQualify)
    return [
      'Waiting',
      'Valid',
      'Retire',
      'Convert',
      'Create Opportunity',
      'Auto Quote',
    ];
  switch (status) {
    case 'Invalid':
      return [
        'Waiting',
        'Invalid',
        'Qualify',
        'Convert',
        'Create Opportunity',
        'Auto Quote',
      ];
    case 'Retire':
      return [
        'Waiting',
        'Valid',
        'Qualify',
        'Retire',
        'Create Opportunity',
        'Auto Quote',
      ];
    case 'Delayed_Convert':
      return [
        'Waiting',
        'Valid',
        'Qualify',
        'Delay Convert',
        'Create Opportunity',
        'Auto Quote',
      ];
    case 'Drop_Quote':
      return [
        'Waiting',
        'Valid',
        'Qualify',
        'Convert',
        'Create Opportunity',
        'Drop Quote',
      ];
    default:
      return [
        'Waiting',
        'Valid',
        'Qualify',
        'Convert',
        'Create Opportunity',
        'Auto Quote',
      ];
  }
};

export const stepsNonConnect = (status) => {
  switch (status) {
    case 'Invalid':
      return ['Waiting', 'Invalid'];
    default:
      return ['Waiting', 'Valid'];
  }
};

export const stepChoice = (status, isRetireWithoutQualify) => {
  if (isRetireWithoutQualify) return 2;
  switch (status) {
    case 'Waiting':
      return 0;
    case 'Valid':
      return 1;
    case 'Qualify':
      return 2;
    case 'Convert':
      return 3;
    case 'Delayed_Convert':
      return 3;
    case 'Create_Opportunity':
      return 4;
    case 'Auto_Quote':
      return 5;
    case 'Invalid':
      return 1;
    case 'Retire':
      return 3;
    case 'Drop_Quote':
      return 5;
    default:
      return 0;
  }
};
export const stepChoiceNonConnect = (status) => {
  switch (status) {
    case 'Waiting':
      return 0;
    case 'Valid':
      return 2;
    case 'Invalid':
      return 1;
    default:
      return 0;
  }
};

export const emptyMessageTabList = (tab) => {
  switch (tab) {
    case 0:
      return 'Activity list is not currently created by the account manager';
    case 1:
      return 'Note list is not currently created by the account manager';
    case 2:
      return 'Attachment list is not currently uploaded by the account manager';
    case 3:
      return 'The product list can be seen if it reaches the status “Opportunity”';
    case 4:
      return 'The contact list can be seen if it reaches the status “Opportunity”';
    case 5:
      return 'The quote list can be seen if it reaches the status “Auto Quote”';
    default:
      return 0;
  }
};

export const type = {
  Waiting: {
    worklogLabel: 'CUSTOMER',
    caption: 'Interested about product',
  },
  Valid: {
    worklogLabel: 'TELKOMREG-MARKETING | VALID',
    caption: 'Assigning to Acount Manager',
  },
  Qualify: {
    worklogLabel: 'STARCLICK | QUALIFY',
    caption: 'Lead has been created on Starclick',
  },
  Convert: {
    worklogLabel: 'STARCLICK | CONVERT',
    caption: 'Lead has been converted on Starclick',
  },
  Delayed_Convert: {
    worklogLabel: 'STARCLICK | DELAY CONVERT',
    caption:
      'Lead has been delayed contract on Starclick, please wait a moment, \
      this status would be automatically converted',
  },
  Create_Opportunity: {
    worklogLabel: 'NCX | CREATE OPPORTUNITY',
    caption: 'Lead has been created opportunity on NCX',
  },
  Auto_Quote: {
    worklogLabel: 'NCX | AUTO QUOTE',
    caption: 'Lead get Quotation Document, generated on NCX',
  },
  Invalid: {
    worklogLabel: 'TELKOMREG-MARKETING | INVALID',
    caption: 'Interested about product was invalid',
  },
  Retire: {
    worklogLabel: 'STARCLICK | RETIRE',
    caption: 'Lead has been retired on Starclick',
  },
  Drop_Quote: {
    worklogLabel: 'NCX | DROP QUOTE',
    caption: 'Lead get drop quote, updated on NCX',
  },
};

export const tableHeader = (tab) => {
  switch (tab) {
    case 0:
      return [
        {
          cellStyle: { minWidth: 200 },
          label: 'ACTIVITY ON',
          name: 'stageType',
          schemaStatus: {
            Waiting: 'warning',
            Invalid: 'danger',
            Valid: 'success',
            Qualify: 'warning',
            Convert: 'success',
            'Delay Convert': 'warning',
            Retire: 'danger',
            Opportunity: 'primary',
            'Auto Quote': 'success',
            'Drop Quote': 'danger',
          },
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'TYPE',
          name: 'type',
        },
        {
          cellStyle: { minWidth: 200 },
          label: 'DESCRIPTION',
          name: 'description',
        },
        {
          cellStyle: { minWidth: 150 },
          formatDate: 'date-time',
          label: 'DUE',
          name: 'due',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'STATUS',
          name: 'status',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'PRIORITY',
          name: 'priority',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'ACCOUNT',
          name: 'account',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'DURATION',
          name: '1000',
        },
      ];
    case 1:
      return [
        {
          cellStyle: { minWidth: 150 },
          formatDate: 'date-time',
          label: 'CREATED',
          name: 'createdAt',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'CREATED BY',
          name: 'createdBy',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'TYPE',
          name: 'type',
        },
        {
          cellStyle: { minWidth: 200 },
          label: 'DESCRIPTION',
          name: 'description',
        },
      ];
    case 2:
      return [
        {
          cellStyle: { minWidth: 150 },
          label: 'NAME',
          name: 'name',
        },
        // {
        //   cellStyle: { minWidth: 150 },
        //   label: 'SIZE (IN BYTES)',
        //   name: 'size',
        // },
        {
          cellStyle: { minWidth: 150 },
          label: 'TYPE',
          name: 'type',
        },
        // {
        //   cellStyle: { minWidth: 150 },
        //   label: 'MODIFIED',
        //   name: 'modified'
        // },
        // {
        //   cellStyle: { minWidth: 150 },
        //   label: 'UPDATE FILE',
        //   name: 'updateFile'
        // },
        {
          cellStyle: { minWidth: 150 },
          label: 'COMMENTS',
          name: 'comments',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'INTEGRATION STATUS',
          name: 'integrationStatus',
        },
      ];
    case 3:
      return [
        {
          cellStyle: { minWidth: 100 },
          label: 'AUTO QUOTE',
          name: 'autoQuote',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'PRODUCT',
          name: 'product',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'PRODUCT LINE',
          name: 'productLine',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'QUANTITY',
          name: 'quantity',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'NET PRICE',
          name: 'netPrice',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'REVENUE',
          name: 'revenue',
        },
        {
          cellStyle: { minWidth: 100 },
          label: 'PROBABILITY (%)',
          name: 'probability',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'SALES REP',
          name: 'salesRep',
        },
      ];
    case 4:
      return [
        {
          cellStyle: { minWidth: 150 },
          label: 'PRIMARY',
          name: 'primary',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'NAME',
          name: 'name',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'FIRST NAME',
          name: 'firstName',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'LAST NAME',
          name: 'lastName',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'MR/MRS',
          name: 'mrMrs',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'WORK PHONE',
          name: 'workPhone',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'WORK FAX',
          name: 'workFax',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'EMAIL',
          name: 'email',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'MOBILE PHONE',
          name: 'mobilePhone',
        },
      ];
    case 5:
      return [
        {
          cellStyle: { minWidth: 150 },
          label: 'QUOTE',
          name: 'quote',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'QUOTE NAME',
          name: 'quoteName',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'REVISION',
          name: 'revision',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'CREATED BY',
          name: 'createdBy',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'CUSTOMER ACCOUNT',
          name: 'customerAccount',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'LAST NAME',
          name: 'lastName',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'STATUS',
          name: 'status',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'CHILD AGREEMENT',
          name: 'childAggrement',
        },
        {
          cellStyle: { minWidth: 150 },
          label: 'ACCOUNT TEAM',
          name: 'accountTeam',
        },
      ];
    default:
      return null;
  }
};

export const testWorklog = [
  {
    external_id: 'MYC1054',
    state: 'Lead',
    status: 'Waiting',
    label: 'Customer',
    id: '-',
    number: '-',
    scid: 1000000205,
    timestamp: '2021-11-10 19:42:20',
    user_agent: 'am_mcr01',
  },
  {
    external_id: 'MYC1054',
    state: 'Lead',
    status: 'Valid',
    label: 'TelkomRegMarketing',
    id: '-',
    number: '-',
    scid: 1000000205,
    timestamp: '2021-11-10 19:42:20',
    user_agent: 'am_mcr01',
  },
  // {
  //   external_id : 'MYC1054',
  //   state : 'Lead',
  //   status : 'Invalid',
  //   label : 'TelkomRegMarketing',
  //   id : '-',
  //   number : '-',
  //   scid : 1000000205,
  //   timestamp : '2021-11-10 19:42:20',
  //   user_agent : 'am_mcr01'
  // },
  {
    external_id: 'MYC1054',
    state: 'Lead',
    status: 'Qualify',
    label: 'Starclick',
    id: '-',
    number: '-',
    scid: 1000000205,
    timestamp: '2021-11-10 19:42:20',
    user_agent: 'am_mcr01',
  },
  {
    external_id: 'MYC1054',
    state: 'Lead',
    status: 'Convert',
    label: 'Starclick',
    id: '-',
    number: '-',
    scid: 1000000205,
    timestamp: '2021-11-10 19:42:20',
    user_agent: 'am_mcr01',
  },
  // {
  //   external_id : 'MYC1054',
  //   state : 'Lead',
  //   status : 'Retire',
  //   label : 'Starclick',
  //   id : '-',
  //   number : '-',
  //   scid : 1000000205,
  //   timestamp : '2021-11-10 19:42:20',
  //   user_agent : 'am_mcr01'
  // },
  {
    external_id: 'MYC1054',
    state: 'Lead',
    status: 'Create_Opportunity',
    label: 'NCX',
    id: '-',
    number: '-',
    scid: 1000000205,
    timestamp: '2021-11-10 19:42:20',
    user_agent: 'am_mcr01',
  },
  {
    external_id: 'MYC1054',
    state: 'Lead',
    status: 'Auto_Quote',
    label: 'NCX',
    id: '-',
    number: '-',
    scid: 1000000205,
    timestamp: '2021-11-10 19:42:20',
    user_agent: 'am_mcr01',
  },
  // {
  //   external_id : 'MYC1054',
  //   state : 'Lead',
  //   status : 'Drop_Quote',
  //   label : 'NCX',
  //   id : '-',
  //   number : '-',
  //   scid : 1000000205,
  //   timestamp : '2021-11-10 19:42:20',
  //   user_agent : 'am_mcr01'
  // },
];
