import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  note: yup.string().required().label('Note'),
  media: yup
    .object()
    .required('Evidence is a required field')
    .nullable()
    .label('Evidence'),
});

export default yupResolver(validation);
