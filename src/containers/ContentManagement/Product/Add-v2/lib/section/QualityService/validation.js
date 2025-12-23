import * as yup from 'yup';

export const validation = yup.object().shape({
  l2QualityServiceTitleid: yup.string().max(200).required().label('Title'),
  l2QualityServiceTitleen: yup.string().max(200).required().label('Title'),
});
