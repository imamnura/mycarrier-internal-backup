import * as yup from 'yup';

const validation = yup.object().shape({
  // REGISTRATION LINK
  eventRegistration: yup
    .string()
    .url()
    .max(240)
    .required()
    .label('Event Registration'),
  pastLink: yup.string().url().max(240).nullable().label('Past Link'),

  // RELATED PRODUCTS
  relatedProduct: yup
    .array()
    .of(
      yup.object().shape({
        catId: yup.string().label('CatId'),
        name: yup.string().label('Product Name'),
      }),
    )
    .label('Related Product'),

  // EVENT DETAILS
  titleid: yup.string().required().max(40).label('Event Name'),
  titleen: yup.string().required().max(40).label('Event Name'),
  location: yup.string().required().max(40).label('Location'),
  typeLocation: yup.string().required().label('Events type'),
  slugid: yup.string().required().max(40).label('Slug'),
  slugen: yup.string().required().max(40).label('Slug'),

  // EVENT BANNER
  imageBanner: yup.object().shape({
    mediaId: yup.string().label('Image Media Id'),
    mediaName: yup.string().label('Image Media Name'),
    mediaPath: yup.string().label('Image Media Path'),
  }),
  descriptionid: yup.string().required().label('Event Description'),
  descriptionen: yup.string().required().label('Event Description'),

  // RUNDOWN
  rundown: yup.array().of(
    yup.object().shape({
      date: yup.string().label('Date rundown'),
      title: yup.string().label('Title rundown'),
      items: yup.array(),
    }),
  ),

  // SPEAKERS
  speakers: yup
    .array()
    .of(
      yup.object().shape({
        imageUrl: yup.object().shape({
          mediaId: yup.string().label('Image Media Id'),
          mediaName: yup.string().label('Image Media Name'),
          mediaPath: yup.string().label('Image Media Path'),
        }),
        name: yup.string().max(40).label('Speaker Name'),
        position: yup.string().max(45).label('Speaker Position'),
      }),
    )
    .label('speakers'),
});

export default validation;
