import { route } from '@configs';

export const breadcrumb = (name, parentName, parentId) => [
  { label: 'Product Management', url: '/product-management' },
  { label: parentName, url: route.productManage('detail', parentId) },
  { label: name },
];

export const schema = (data) => {
  const value = [
    {
      gridProps: { xs: 12, md: 5 },
      content: [
        {
          type: 'information',
          title: 'Product Information',
          properties: {
            data: data,
            schema: [
              { name: 'name', label: 'Product Page Name', grid: 12 },
              { name: 'slug', label: 'Product Slug', grid: 12 },
              { name: 'metaSeo.title', label: 'Meta Title', grid: 12 },
              {
                name: 'metaSeo.keyword',
                label: 'Meta Keyword',
                grid: 12,
                type: 'tags',
              },
              {
                name: 'metaSeo.description',
                label: 'Meta Description',
                grid: 12,
              },
            ],
          },
        },
      ],
    },
  ];

  if (!data.isSingleProduct) {
    value[0].content.push({
      type: 'information',
      title: 'Level Mapping',
      properties: {
        data: data,
        schema: [{ name: 'level', label: 'Page Level', grid: 12 }],
      },
    });

    if (data.categoryName) {
      //Level Mapping Section If It's Product Detail
      value[0].content[1].properties.schema.push({
        name: 'categoryName',
        label: 'Level 2 Category',
        grid: 12,
        type: 'tags',
      });
    }
  }

  return value;
};
