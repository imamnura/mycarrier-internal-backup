export const breadcrumb = (isEdit) => [
  {
    label: 'Product Management',
    url: '/product-management',
  },
  { label: isEdit ? 'Edit Product' : 'Add Product' },
];
