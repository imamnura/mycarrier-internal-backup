import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  sid: yup.string().required().label('SID'),
});

export default yupResolver(validation);
