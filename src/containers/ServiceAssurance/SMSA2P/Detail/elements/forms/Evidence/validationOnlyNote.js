import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationOnlyNote = yup.object().shape({
  note: yup
    .string()
    .required(`You didn't give any reason, please describe it`)
    .label('Reason'),
});

export default yupResolver(validationOnlyNote);
