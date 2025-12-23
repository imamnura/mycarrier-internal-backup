import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  toc: yup.object().shape({
    appreciation: yup.string().required().label('Company Name'),
    rfs: yup.object().shape({
      from: yup.string().required().label('Company Name'),
      to: yup.string().required().label('Company Name'),
    }),
    tnc_note: yup.string().required().label('Company Name'),
    usage: yup.object().shape({
      period: yup.string().required().label('Company Name'),
      unit: yup.string().required().label('Company Name'),
    }),
  }),
});

export default yupResolver(validation);
