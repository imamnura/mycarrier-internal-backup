import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationOnlyNote = yup.object().shape({
  note: yup.string().required().label('Reason'),
});

export default yupResolver(validationOnlyNote);
