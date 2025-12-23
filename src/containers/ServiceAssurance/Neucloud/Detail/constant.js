export const breadcrumb = (id) => [
  { label: 'NeuCloud', url: '/service-assurance-neucloud' },
  { label: id },
];

export const steps = ['Checking', 'On Progress', 'Closed'];

export const stepChoice = (status) => {
  switch (status) {
    case 'checking':
      return 0;
    case 'onprogress':
      return 1;
    case 'completed':
      return 3;
    default:
      return 0;
  }
};

export const generateStatus = (params) => {
  const type = {
    checking: {
      label: 'CHECKING',
      variant: 'blue',
    },
    onprogress: {
      label: 'ON PROGRESS',
      variant: 'orange',
    },
    completed: {
      label: 'CLOSED',
      variant: 'green',
    },
  };

  const label = type[params] ? type[params].label : '';
  const variant = type[params] ? type[params].variant : '';
  return { label, variant };
};

export const detailSchema = () => {
  return {
    orderInformation: {
      title: 'Customer Information',
      data: [
        { name: 'dataCustomerAccount.custAccntName', label: 'Customer' },
        { name: 'usernameTicket', label: 'Username' },
      ],
    },
    troubleDescription: {
      title: 'Trouble Description',
      data: [
        { label: 'Ticket Number', name: 'ticketId', inline: true },
        { label: 'Reference ID', name: 'referenceId' },
        { label: 'Created Date', name: 'createdAt', dateTime: true, grid: 12 },
        { label: 'Trouble Type', name: 'troubleType', grid: 12 },
        { label: 'Trouble Description', name: 'troubleDesc', grid: 12 },
      ],
    },
  };
};

export const pickTitle = (note) => {
  switch (note) {
    case 'Create NeuCloud Ticket':
      return 'CUSTOMER';
    case 'OCC Telkom updating status to On Progress':
      return 'OCC TELKOM DWS | UPDATE STATUS';
    case 'Solved ticket and send evidence to customer':
      return 'OCC TELKOM DWS | UPDATE STATUS';
    case 'OCC Telkom giving note':
      return 'OCC TELKOM DWS | GIVE NOTE';
    case 'Closed Ticket':
      return 'OCC TELKOM DWS | INCIDENT';
    default:
      return 'OCC TELKOM DWS';
  }
};
