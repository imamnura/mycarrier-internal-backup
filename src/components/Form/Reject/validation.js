import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { titleCapitalize } from '@utils/common';

const validation = (name) => {
  const validate = yup.object().shape({
    [`${name}`]: yup.string().required().label(titleCapitalize(name)),
  });
  return yupResolver(validate);
};

export default validation;
