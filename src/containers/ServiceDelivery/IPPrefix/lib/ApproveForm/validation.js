import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { iPv4Regex, iPv6Regex } from '@utils/common';

const validate = yup.object().shape({
  requestName: yup.string().required().label('Request Name'),
  node: yup.string().required().label('Node'),
  port: yup
    .string()
    .when('createNewPort', {
      is: true,
      then: yup.string().optional(),
      otherwise: yup.string().required(),
    })
    .label('Port'),
  newPort: yup
    .string()
    .when('createNewPort', {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string().optional(),
    })
    .label('New Port'),
  ipCe: yup
    .string()
    .required()
    .test('ipv4-or-ipv6', 'Invalid IP Address', function (value) {
      return iPv4Regex.test(value) || iPv6Regex.test(value);
    })
    .label('IP CE'),
  noteProgress: yup.string().required().label('Notes'),
});

export default yupResolver(validate);
