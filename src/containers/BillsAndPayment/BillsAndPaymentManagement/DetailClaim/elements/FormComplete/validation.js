import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  note: yup.string().required().label('Note'),
  evidence: yup
    .object()
    .required()
    .label('Evidence')
    .typeError('Evidence is a required field'),
});

export default yupResolver(validation);
