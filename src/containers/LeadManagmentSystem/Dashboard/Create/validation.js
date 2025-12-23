import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegex } from '@utils/common';

const validation = yup.object().shape({
  businessType: yup.string().required().label('Business Type'),
  companyName: yup.object().when('isOtherCustomer', {
    is: true,
    then: yup.object().optional().label('Company Name'),
    otherwise: yup.object().required().label('Company Name'),
  }),
  companySize: yup.string().required().label('Company Size'),
  contactEmail: yup.string().email().label('Business Email'),
  description: yup.string().required().label('Description'),
  descriptionType: yup.string().required().label('Description Type'),
  fullName: yup.string().when('validBy', {
    is: (val) => val === 'sendEmail',
    then: yup.string().required().label('Full Name'),
    otherwise: yup.string().optional().label('Full Name'),
  }),
  location: yup.string().required().label('Location'),
  name: yup.object().when('isOtherContact', {
    is: true,
    then: yup.object().optional().label('Full Name'),
    otherwise: yup.object().required().label('Full Name'),
  }),
  otherName: yup.string().when('isOtherContact', {
    is: true,
    then: yup.string().required().label('Full Name'),
    otherwise: yup.string().optional().label('Full Name'),
  }),
  occupation: yup.string().required().label('Occupation'),
  otherBusinessType: yup.string().when('businessType', {
    is: (val) => val == 'Others',
    otherwise: yup.string().optional().label('Other Business Type'),
    then: yup.string().required().label('Other Business Type'),
  }),
  otherCompanyName: yup.string().when('isOtherCustomer', {
    is: true,
    then: yup.string().required().label('Company Name'),
    otherwise: yup.string().optional().label('Company Name'),
  }),
  otherDescriptionType: yup.string().when('descriptionType', {
    is: (val) => val == 'Others',
    otherwise: yup.string().optional().label('Other Description Type'),
    then: yup.string().required().label('Other Description Type'),
  }),
  phone: yup
    .string()
    .matches(phoneRegex, 'Phone Number must use the correct format (+62xxx)')
    .required()
    .min(12)
    .label('Phone Number'),
  phoneNumber: yup.string().when('validBy', {
    is: (val) => val === 'sendEmail',
    then: yup
      .string()
      .required()
      .matches(phoneRegex, 'Phone Number must use the correct format (+62xxx)')
      .required()
      .min(12)
      .label('Phone Number'),
    otherwise: yup.string().optional().label('Phone Number'),
  }),
  product: yup.object().required().label('Product Name'),
  otherProduct: yup.string().when('product', {
    is: (val) => val?.value == 'Others',
    otherwise: yup.string().optional().label('Others Product Name'),
    then: yup.string().required().label('Others Product Name'),
  }),
  source: yup.string().required().label('Source'),
  // otherSource: yup.string().when('source', {
  //   is: val => val == 'Others',
  //   otherwise: yup.string().optional().label('Others Source'),
  //   then: yup.string().required().label('Others Source')
  // }),
  recipientEmail: yup.string().when('validBy', {
    is: (val) => val === 'sendEmail',
    then: yup.string().required().email().label('Email'),
    otherwise: yup.string().optional().label('Email'),
  }),
  amMapping: yup.array().when('validBy', {
    is: (val) => val === 'amMapping',
    then: yup.array().min(1).label('Sales Team'),
    otherwise: yup.array().label('Sales Team'),
  }),
});

export default yupResolver(validation);
