import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  networkType: yup.string().required(),
});

export default yupResolver(validation);
