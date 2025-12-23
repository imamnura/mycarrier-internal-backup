import * as yup from 'yup';

// eslint-disable-next-line no-useless-escape
const phoneRegex = /^$|^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

export const validation1 = yup.object().shape({
  address: yup.string().max(160).required().label('Address'),
  contactName: yup.string().max(40).label('PIC Name'),
  picName: yup.string().max(40).required().label('PIC Name'),
  contactPhone: yup
    .string()
    .matches(phoneRegex, 'Phone number is not valid')
    .max(16, 'max 16'),
  picPhoneNumber: yup
    .string()
    .required('PIC Contact is a required field')
    .matches(phoneRegex, 'Phone number is not valid')
    .max(16, 'max 16'),
  description: yup.string().required().label('Description'),
  firstCallResolution: yup.string().required().label('First Call Resolution'),
  hardComplaint: yup.string().required().label('Hard Complaint'),
  occNote: yup.string().max(160).required().label(`OCC's Note`),
  product: yup.string().required().label('Product'),
  productId: yup.string().required().label('Product'),
  // service: yup.string().required().label('Service'),
  segment: yup.string().required().label('Segment'),
  serviceId: yup.string().max(40).required().label('Service ID'),
  urgency: yup.string().required().label('Urgency'),
  symptoms: yup.string().required().label('Symptoms'),
  symptompDesc: yup.string().required().label('Symptoms'),
  symptompPath: yup.string().required().label('Symptoms'),
  symptompName: yup.string().required().label('Symptoms'),
});
