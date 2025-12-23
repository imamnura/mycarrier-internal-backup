import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  documentName: yup.string().max(80).required().label('Document Name'),
  documentDesc: yup.string().max(140).required().label('Description'),
});

export default yupResolver(validation);
