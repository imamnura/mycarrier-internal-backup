import * as yup from 'yup';

export const validation = yup.object().shape({
  l2BenefitTitleid: yup.string().max(40).required().label('Title'),
  l2BenefitDescid: yup.string().max(1000).required().label('Description'),
});
