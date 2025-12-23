import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = (selected) => {
  const selectedValidation = selected.reduce((o, key) => {
    if (key.label !== '') {
      return {
        ...o,
        // [key.evidence]: yup.object().required().nullable().label('Evidence'),
      };
    } else {
      return {
        ...o,
        // [key.evidence]: yup.object().required().nullable().label('Evidence'),
        customActivity: yup.string().required().label('Activity'),
      };
    }
  }, {});

  return yupResolver(
    yup.object().shape({
      status: yup.string().required().label('Status'),
      ...selectedValidation,
    }),
  );
};

export default validation;
