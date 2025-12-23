export const maskUserType = (value) => {
  const type = {
    customer: 'Customer',
    internal_staff: 'Internal Staff',
    internal_non_staff: 'Internal Non Staff',
  };

  return type[value] || '-';
};
