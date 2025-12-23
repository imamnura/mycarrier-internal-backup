import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  media: yup.object().required().label('BASO'),
});

export default yupResolver(validation);
