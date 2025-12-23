import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  chooseBakes: yup.string().required(),
  typeBakes: yup.string().when('chooseBakes', {
    is: 'existing',
    then: yup.string().required(),
  }),
  BAKESNumber: yup.string().when('chooseBakes', {
    is: 'upload',
    then: yup.string().required(),
  }),
  BAKESName: yup.string().when('chooseBakes', {
    is: 'existing',
    then: yup.string().required(),
  }),
  media: yup.object().nullable().when('chooseBakes', {
    is: 'upload',
    then: yup.object().nullable().required(),
  }),
});

export default yupResolver(validation);
