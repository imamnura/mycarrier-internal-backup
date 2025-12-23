import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = () => {
  const schema = yup.object().shape({
    roleName: yup.string().required().max(80).label('Role Name'),
    userType: yup.string().required().label('User Type'),
  });

  return yupResolver(schema);
};

export default validation;
