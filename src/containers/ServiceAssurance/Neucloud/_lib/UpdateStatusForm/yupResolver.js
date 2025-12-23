import * as yup from 'yup';

export const validation = yup.object().shape({
  note: yup.string().required().label('Note'),
});
