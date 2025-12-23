import * as yup from 'yup';

const validation = (category) => {
  const validate = yup.object().shape({
    nameid: yup.string().required().max(140).label('Article name'),
    nameen: yup.string().required().max(140).label('Article name'),
    captionid: yup.string().required().max(255).label('Caption'),
    captionen: yup.string().required().max(255).label('Caption'),
    keyword: yup.string().max(40).label('Keyword'),
    imageFile: yup
      .object()
      .required()
      .label('Image')
      .typeError(
        'Image is a required field. Please upload a .png file with a minimum resolution of 600 x 400 pixels and a maximum size of 1MB',
      ),
    categoryArticle: yup
      .string()
      .required()
      .when('loadingCategory', {
        is: false,
        then: yup
          .string()
          .required()
          .oneOf(
            category,
            'Article Category must be one of the following values',
          ),
      })
      .label('Article Category'),
  });

  return validate;
};

export default validation;
