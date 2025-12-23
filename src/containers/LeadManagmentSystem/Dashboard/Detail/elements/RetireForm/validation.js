import * as yup from 'yup';

export const validation = () => {
  return yup.object().shape({
    note: yup.string().required().label('Note'),
    reason: yup.string().required().label('Reason'),
  });
};
