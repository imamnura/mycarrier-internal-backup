import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  username: yup.string().required().label('Username'),
  password: yup.string().required().label('Password'),
});

export default yupResolver(validation);
