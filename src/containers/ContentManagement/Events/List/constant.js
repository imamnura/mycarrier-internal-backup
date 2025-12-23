export const tableHeader = [
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'EVENT ID',
    name: 'eventId',
  },
  {
    cellStyle: {
      minWidth: 250,
    },
    label: 'EVENT NAME',
    name: 'title',
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'DATE HELD',
    name: 'dateHeld',
    sort: true,
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'CONTENT STATUS',
    name: 'status',
    schemaStatus: {
      DRAFT: 'primary',
      PUBLISH: 'success',
    },
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'EVENT STATUS',
    name: 'eventStatus',
    schemaStatus: {
      'UPCOMING EVENT': 'primary',
      'PAST EVENT': 'success',
    },
  },
  {
    cellStyle: {
      minWidth: 150,
    },
    label: 'ACTION',
    name: 'operations',
  },
];

export const normalizeStatus = (status) => {
  switch (status) {
    case 'upcoming':
      return 'UPCOMING EVENT';
    case 'past':
      return 'PAST EVENT';
  }
};

export const normalizeContentStatus = (status) => {
  switch (status) {
    case 'draft':
      return 'DRAFT';
    case 'publish':
      return 'PUBLISH';
  }
};

export const optionsEventsStatus = [
  { label: 'All Event Status', value: '' },
  { label: 'Upcoming Event', value: 'upcoming' },
  { label: 'Past Event', value: 'past' },
];

export const optionsContentStatus = [
  { label: 'All Content Status', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Publish', value: 'publish' },
];
