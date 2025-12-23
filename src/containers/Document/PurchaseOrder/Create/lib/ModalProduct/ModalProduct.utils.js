export const defaultValues = {
  packagesSolutions: [
    {
      id: '',
      subTotal: 0,
      paymentType: '',
      price: null,
    },
  ],
};

export const useWording = (productName, step) =>
  ({
    1: {
      title: 'Add Product & Service',
      subtitle: 'Please select the product you want to order.',
    },
    2: {
      title: 'Specific Information',
      subtitle: `Please fill specific information for ${productName} product.`,
    },
  })[step];
