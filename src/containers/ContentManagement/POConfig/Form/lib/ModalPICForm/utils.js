export const normalizeNewForm = (values) => {
  const normalize = {
    name: values?.name,
    email: values?.email,
    phoneNumber: values?.phoneNumber,
    id: values?.id,
  };

  return normalize;
};
