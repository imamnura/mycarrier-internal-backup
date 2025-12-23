import { textLimit } from '@utils/text';

export const breadcrumb = (name) => [
  { label: 'Homepage Management', url: '/homepage-management?type=brochure' },
  { label: textLimit(name, 40) },
];

export const handleSchema = (data) => {
  const schema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Document Detail',
          properties: {
            data: data,
            schema: [
              { name: 'id', label: 'Document Id', grid: 6 },
              { name: 'createdAt', label: 'Date Uploaded', grid: 6 },
              { name: 'size', label: 'Size', grid: 6 },
              { name: 'fileType', label: 'fileType', grid: 6 },
              { name: 'name', label: 'Document Name', grid: 12 },
              { name: 'description', label: 'Description', grid: 12 },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Uploaded Document',
          properties: {
            data: data,
            schema: [{ name: 'document', label: '' }],
          },
        },
      ],
    },
  ];

  return schema;
};
