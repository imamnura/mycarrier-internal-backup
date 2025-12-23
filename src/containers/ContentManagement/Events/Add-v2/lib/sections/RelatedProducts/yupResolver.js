import * as yup from 'yup';

export const validation = yup.object().shape({
  selectedProduct: yup.string().required().label('Product'),
});
