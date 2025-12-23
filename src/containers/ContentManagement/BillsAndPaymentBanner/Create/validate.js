import * as yup from 'yup';

const validate = yup.object().shape({
  title: yup.string().required().label('Banner title'),
  bannerDesc: yup.string().required().label('Description title'),
  imageBanner: yup
    .object()
    .required()
    .label('Image')
    .typeError(`Image is a required field, max 512 KB and size 840 x 160 px`),
});

export default validate;
