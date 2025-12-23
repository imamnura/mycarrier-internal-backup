export const breadcrumb = (label = null) => [
  { label: 'Events Management', url: '/events-management' },
  { label: label },
];

export const handleSchema = (data) => {
  const schema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Events Information',
          properties: {
            data: data,
            schema: [
              { name: 'eventName', label: 'Event Name', grid: 12 },
              { name: 'eventId', label: 'Event Id', grid: 6 },
              { name: 'status', label: 'Content Status', grid: 6 },
              { name: 'dateHeld', label: 'Date Held', grid: 12 },
              { name: 'location', label: 'Event Location', grid: 6 },
              { name: 'typeLocation', label: 'Event Type', grid: 6 },
              {
                name: 'eventRegistration',
                label: 'Event Registration',
                grid: 12,
              },
              { name: 'pastLink', label: 'Link (For Past Event)', grid: 12 },
            ],
          },
        },
      ],
    },
  ];

  return schema;
};

export const normalizeDetail = (data) => {
  return {
    ...data,
    eventName: data?.localizations[0].title,
  };
};

export const getEventStatus = (status) => {
  if (!status) return undefined;
  let statusEvent = '';
  if (status === 'past') statusEvent = 'past event';
  else statusEvent = 'upcoming event';

  const variant =
    {
      past: 'success',
      upcoming: 'primary',
    }[status] || '';

  return {
    children: statusEvent,
    variant: variant,
  };
};
