import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const validation = yup.object().shape({
  note: yup.string().required().label('Note'),
});

export default yupResolver(validation);
