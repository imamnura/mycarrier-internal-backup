import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const validation = yup.object().shape({
  file: yup.object().required().label('File'),
});

export default yupResolver(validation);
