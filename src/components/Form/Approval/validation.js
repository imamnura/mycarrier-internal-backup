import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

export const validation = (labelValidate) => {
  return yup.object().shape({
    reason: yup
      .string()
      .required()
      .label(labelValidate || 'Note'),
  });
};

// export default yupResolver(validation);
