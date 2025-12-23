export const breadcrumb = () => [
  { label: 'General Product', url: '/service-assurance-general-product' },
  { label: 'Create Ticket' },
];

export const handleStatus = (params) => {
  const type = {
    draft: {
      label: 'draft',
      variant: 'blue',
    },
  };

  const label = type[params] ? type[params].label : '';
  const variant = type[params] ? type[params].variant : '';
  return { label, variant };
};
