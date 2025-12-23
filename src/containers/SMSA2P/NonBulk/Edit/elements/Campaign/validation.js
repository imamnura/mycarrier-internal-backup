import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const validation = (isChannelMMS) =>
  yupResolver(
    yup.object().shape({
      ...(isChannelMMS
        ? {
            media: yup.object().nullable().required().label('Image/Video'),
          }
        : {
            media: yup.object().nullable().label('Image/Video'),
          }),
      quantity: yup.number().required().min(0).label('Quantity'),
      location: yup.string().required().label('Location'),
      religion: yup.string().required().label('Religion'),
      gender: yup.string().required().label('Gender'),
      minimumAge: yup.number().required().min(0).label('Minimum Age'),
      maximumAge: yup.number().required().min(0).label('Maximum Age'),
      minimumARPU: yup.number().required().min(0).label('Minimum ARPU'),
      maximumARPU: yup.number().required().min(0).label('Maximum ARPU'),
      smsPerDayLocation: yup.number().required().label('SMS per Day Location'),
      campaignDate: yup.date().required().label('Camgaign Date').nullable(true),
      campaignStartTime: yup
        .date()
        .required()
        .label('Camgaign Start Time')
        .nullable(true),
      campaignEndTime: yup
        .date()
        .required()
        .label('Camgaign End Time')
        .nullable(true),
      wording: yup.string().required().label('Wording'),
    }),
  );
