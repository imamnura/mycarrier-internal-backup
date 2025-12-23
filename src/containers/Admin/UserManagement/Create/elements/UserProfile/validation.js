import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = (userType = 'customer') => {
  let schema = null;

  if (userType === 'customer') {
    schema = yup.object().shape({
      company: yup.object().required().label('Customer Name'),
      fullName: yup.string().required().label('Full Name'),
      email: yup.string().required().email().label('Email'),
      phone: yup.object().required().label('Phone Number'),
      role: yup.object().required().label('Role'),
    });
  } else if (userType === 'internal_staff') {
    schema = yup.object().shape({
      nik: yup.string().required().label('NIK'),
      fullName: yup.string().required().label('Full Name'),
      email: yup.string().required().email().label('Email'),
      phone: yup.object().shape({
        number: yup.string().required().min(8).label('Phone'),
      }),
      segment: yup.string().required().label('Segment'),
      role: yup.object().required().label('Role'),
    });
  } else if (userType === 'internal_non_staff') {
    schema = yup.object().shape({
      fullName: yup.string().required().label('Full Name'),
      email: yup.string().required().email().label('Email'),
      phone: yup.object().shape({
        number: yup.string().required().min(8).label('Phone'),
      }),
      segment: yup.string().required().label('Segment'),
      role: yup.object().required().label('Role'),
    });
  }

  return yupResolver(schema);
};

export default validation;
