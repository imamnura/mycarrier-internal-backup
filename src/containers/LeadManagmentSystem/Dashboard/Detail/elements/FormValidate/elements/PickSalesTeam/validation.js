import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  amMapping: yup
    .array()
    .min(1)
    .max(4, `Assign Sales Team can't be more than 4`)
    .label('Sales Team'),
});

export default yupResolver(validation);
