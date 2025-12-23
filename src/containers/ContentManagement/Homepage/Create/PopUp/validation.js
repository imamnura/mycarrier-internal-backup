import * as yup from 'yup';

export const validation = yup.object().shape({
  name: yup.string().required().label('Pop Up Name'),
  imageUrl: yup.object().nullable().required().label('Image Pop Up'),
  link: yup.string().required().label('Action Button Link'),
  period: yup.string().required().label('Period'),
  startPeriod: yup
    .string()
    .nullable()
    .when('period', {
      is: 'by period',
      then: yup.string().required().nullable(),
    })
    .label('Period Start Date'),
  endPeriod: yup
    .string()
    .nullable()
    .when('period', {
      is: 'by period',
      then: yup.string().required().nullable(),
    })
    .label('Period End Date'),
  status: yup.bool().required().label('Status'),
});

export default validation;
