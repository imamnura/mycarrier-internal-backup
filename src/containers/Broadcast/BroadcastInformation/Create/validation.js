import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  broadcastName: yup.string().required().label('Broadcast Name'),
  contactGroup: yup.array().min(1).required().label('Contact Group'),
  isSendNow: yup.bool(),
  paragraph1: yup.string().required().label('Paragraph 1'),
  schedule: yup.string().when('isSendNow', {
    is: true,
    otherwise: yup
      .string()
      .required()
      .typeError('Invalid format date')
      .label('Date'),
    then: yup.string().optional().label('Date'),
  }),
  uploadMedia: yup.object(),
});

export default yupResolver(validation);
