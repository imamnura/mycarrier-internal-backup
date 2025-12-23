import * as yup from 'yup';

export const validation = () => {
  return yup.object().shape({
    reason: yup.string().required().label('Reason'),
    approver: yup.object().required().label('Approver'),
  });
};
