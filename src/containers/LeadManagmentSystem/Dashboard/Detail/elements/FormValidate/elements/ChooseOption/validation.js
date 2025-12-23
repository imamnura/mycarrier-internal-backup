import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  validBy: yup.string().required().label('Option'),
});

export default yupResolver(validation);
