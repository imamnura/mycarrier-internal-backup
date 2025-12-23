import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = (validationForm = {}) => {
  const validate = yup.object().shape(validationForm);
  return yupResolver(validate);
};

export default validation;
