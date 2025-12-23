import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  email: yup.string().required().email().max(40).label('Email'),
});

export default yupResolver(validation);
