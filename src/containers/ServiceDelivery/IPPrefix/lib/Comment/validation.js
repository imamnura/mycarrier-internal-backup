import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validate = yup.object().shape({
  comment: yup.string().required().label('Comment'),
});

export default yupResolver(validate);
