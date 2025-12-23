import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationOnlyLogSMSC = yup.object().shape({
  trouble: yup
    .array()
    .of(
      yup.object().shape({
        logSMSC: yup.string().required().label('Title Product Description'),
      }),
    )
    .min(1)
    .required()
    .label('Product Description'),
});

export default yupResolver(validationOnlyLogSMSC);
