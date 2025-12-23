import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  note: yup.string().required().label('Note'),
  media: yup.object().required().nullable(),
});

export default yupResolver(validation);
