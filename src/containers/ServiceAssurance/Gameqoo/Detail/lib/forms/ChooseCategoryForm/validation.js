import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  category: yup.string().required().label('Salesforce Category'),
  subcategory: yup.string().required().label('Salesforce Subcategory'),
});

export default yupResolver(validation);
