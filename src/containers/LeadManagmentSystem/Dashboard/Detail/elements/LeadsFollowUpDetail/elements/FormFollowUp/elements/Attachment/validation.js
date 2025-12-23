import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  document: yup
    .object()
    .required()
    .label('Document')
    .typeError('Document is a required field'),
  docType: yup.string().required().label('Document Type'),
  comment: yup.string().required().label('Description'),
});

export default yupResolver(validation);
