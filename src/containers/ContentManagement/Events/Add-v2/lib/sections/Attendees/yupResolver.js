import * as yup from 'yup';

export const validation = yup.object().shape({
  attendee: yup.string().max(40).required().label('Attendee'),
});
