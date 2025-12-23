import * as yup from 'yup';

const validationBrochure = yup.object().shape({
  name: yup.string().max(80).required().label('Brochure name'),
  description: yup.string().max(140).required().label('Description'),
});

export default validationBrochure;
