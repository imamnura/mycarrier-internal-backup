export const breadcrumb = (name) => [
  { label: 'Product Management', url: '/product-management' },
  { label: name },
];

export const handleDeleteMessage = (level) => {
  let content = '';
  let secondaryContent = '';

  if (level === 'l1') {
    content = 'Are you sure want to delete this level 1 page?';
    secondaryContent =
      'Once you delete this, the exist L2 category and product detail page would be deleted';
  } else if (level === 'l2') {
    content = 'Are you sure want to delete this product detail page?';
  } else {
    content = 'Are you sure want to delete this product category?';
    secondaryContent =
      'Once you delete this, the all product tree would be deleted';
  }
  return { content, secondaryContent };
};

export const productTypeList = [
  {
    id: 1,
    label: 'Single Parent Level',
    desc: 'Just add Level 1 using Product Detail Page template',
  },
  {
    id: 2,
    label: 'With Child Level',
    desc: 'Add Level 1, Level 2 Category & Product Detail page',
  },
];

export const handleSchema = (data, productTree) => {
  const schema = [
    {
      gridProps: { xs: 12, md: 5 },
      content: [
        {
          type: 'information',
          title: 'Product Information',
          properties: {
            data: data,
            schema: [
              { name: 'id', label: 'Product ID', grid: 12 },
              { name: 'name', label: 'Product Category', grid: 12 },
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
        {
          type: 'information',
          title: 'Level Mapping',
          properties: {
            data: data,
            schema: [{ name: 'level', label: 'Page Level', grid: 12 }],
          },
        },
        {
          type: 'attachment',
          title: 'Icon Assets',
          properties: {
            data: data,
            schema: [{ name: 'iconUrl', label: '' }],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 7 },
      stickRight: true,
      content: [
        {
          type: 'custom',
          title: 'Product Tree',
          render: productTree,
        },
      ],
    },
  ];

  return schema;
};
