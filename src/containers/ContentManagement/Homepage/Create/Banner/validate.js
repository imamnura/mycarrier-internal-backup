import * as yup from 'yup';

const validate = yup.object().shape({
  titleid: yup.string().required().label('Banner title'),
  descriptionid: yup.string().required().label('Description title'),
  titleen: yup.string().required().label('Banner title'),
  descriptionen: yup.string().required().label('Description title'),
  type: yup.string().required().label('Type'),
  linkedTo: yup
    .string()
    .label('Product Slug')
    .when('type', {
      is: 'internal',
      then: yup.string().required().label('Product Slug'),
    }),
  linkedToEksternal: yup
    .string()
    .max(200)
    .url()
    .label('Please type valid url')
    .when('type', {
      is: 'eksternal',
      then: yup.string().required().label('Product Slug'),
    }),
  imageDesktop: yup
    .object()
    .required()
    .label('Image')
    .typeError(`Image is a required field, max 512 KB and size 1440 x 520 px`),
  imageMobile: yup
    .object()
    .required()
    .label('Image')
    .typeError(`Image is a required field, max 512 KB and size 360 x 300 px`),
});

export default validate;
