import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  troubleFile: yup
    .object()
    .required('Evidence is a required field')
    .nullable()
    .label('File'),
});

export default yupResolver(validation);
