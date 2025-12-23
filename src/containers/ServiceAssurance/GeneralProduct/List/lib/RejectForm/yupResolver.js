import * as yup from 'yup';

export const validation = yup.object().shape({
  reason: yup.string().required().label('Reason'),
});
