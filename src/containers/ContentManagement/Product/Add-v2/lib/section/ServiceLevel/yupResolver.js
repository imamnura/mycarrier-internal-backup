import * as yup from 'yup';

export const validation = yup.object().shape({
  l2GuaranteeTitleCardid: yup.string().max(40).required().label('Title'),
  l2GuaranteeCaptionid: yup.string().max(120).required().label('Caption'),
});
