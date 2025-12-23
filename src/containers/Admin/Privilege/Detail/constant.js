import { dateFormat } from '@utils/parser';

export const breadcrumb = (journey) => [
  { label: 'Privilege Management', url: '/privilege-management' },
  { label: journey },
];

export const normalizeDetail = (data) => {
  let categories = '';
  if (Array.isArray(data.category)) {
    let reshape = [];
    data.category.map(({ title }) => reshape.push(title));
    categories = reshape.length > 0 ? reshape.join(', ').toString() : '-';
  }
  return {
    ...data,
    categories: categories,
    updatedAt: dateFormat({
      date: data?.updatedAt,
      type: 'date-month-year-time',
    }),
  };
};

export const detailSchema = (data) => {
  const schema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Privilege Profile',
          properties: {
            data: normalizeDetail(data),
            schema: [
              { name: 'journeyId', label: 'Id Privilege', grid: 6 },
              { name: 'journey', label: 'Privilege Name', grid: 6 },
              { name: 'categories', label: 'Category', grid: 12 },
              { name: 'type', label: 'Type', grid: 12 },
              { name: 'updatedAt', label: 'Last Update', grid: 12 },
            ],
          },
        },
      ],
    },
  ];
  return schema;
};
