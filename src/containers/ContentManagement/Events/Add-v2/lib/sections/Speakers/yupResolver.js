import * as yup from 'yup';

export const validation = yup.object().shape({
  speakerName: yup.string().max(20).required().label('Speaker Name'),
  speakerPosition: yup.string().max(45).required().label('Speaker Position'),
});
