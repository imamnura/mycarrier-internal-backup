import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  companyName: yup.string().required().label('Company Name'),
  brandName: yup.string().required().label('Brands Name'),
  industryCategory: yup.string().required().label('Brands Name'),
  campaignName: yup.string().required().label('Campaign Name'),
  campaignType: yup.string().required().label('Campaign Type'),
  channel: yup.string().required().label('Channel'),
  senderId: yup.string().min(3).required().label('Sender ID/Masking'),
});

export default yupResolver(validation);
