import { dateFormat } from '@utils/parser';

export const breadcrumb = (id) => [
  { label: 'User Download Brochure', url: '/dashboard/user-download-brochure' },
  { label: id },
];

export const handleSchema = (data) => {
  const schema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Brochure Detail',
          properties: {
            data: data,
            schema: [
              { name: 'brochureId', label: 'BROCHURE ID' },
              { name: 'dateDownload', label: 'DATE DOWNLOAD', date: true },
              { name: 'typeOfLogin', label: 'TYPE OF LOGIN' },
              { name: 'newsLetterStatus', label: 'NEWSLETTER STATUS' },
              { name: 'product', label: 'PRODUCT' },
              { name: 'source', label: 'SOURCE', grid: 12 },
            ],
          },
        },
        {
          type: 'information',
          title: 'Contact Detail',
          properties: {
            data: data,
            schema:
              data.typeOfLogin === 'Before Login'
                ? [
                    { name: 'name', label: 'NAME', grid: 12 },
                    { name: 'email', label: 'EMAIL', grid: 12 },
                  ]
                : [
                    { name: 'name', label: 'NAME', grid: 12 },
                    {
                      name: 'contactNumber',
                      label: 'CONTACT NUMBER',
                      grid: 12,
                    },
                    { name: 'email', label: 'EMAIL', grid: 12 },
                  ],
          },
        },
      ],
    },
  ];

  if (data.typeOfLogin === 'After Login')
    schema[0].content.splice(1, 0, {
      type: 'information',
      title: 'Company Detail',
      properties: {
        data: data,
        schema: [
          { name: 'companyName', label: 'COMPANY NAME', grid: 12 },
          { name: 'location', label: 'LOCATION', grid: 12 },
        ],
      },
    });

  return schema;
};

export const normalizeDetail = (data) => {
  return {
    ...data,
    dateDownload: dateFormat({
      date: data.dateDownload,
      type: 'date-time',
    }),
    newsLetterStatus: data?.newsLetterStatus
      ? 'Yes, receive a newsletter'
      : `No, don’t want to receive a newsletter`,
  };
};
