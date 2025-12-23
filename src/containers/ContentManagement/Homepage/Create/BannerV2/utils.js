import { reduce } from 'lodash';

export const pickTitleFormLocalization = {
  ID: 'Bahasa Indonesia',
  EN: 'English',
};

export const normalizeDetail = (data) => {
  let withSecondaryButton = false;
  const normalize = {
    ...data,
    media: {
      fileUrl: data?.mediaUrl,
      fileName: data?.mediaUrl?.split('/')?.pop(),
    },
    localizations: reduce(
      data?.localizations,
      (result, { language, title, description, ctaButtons }) => {
        result[language?.toUpperCase()] = {
          title,
          description,
          ctaButtons: reduce(
            ctaButtons,
            (result, { buttonType, label, link }) => {
              if (buttonType === 'secondary' && !withSecondaryButton) {
                withSecondaryButton = true;
              }
              result[buttonType] = { label, link };
              return result;
            },
            {},
          ),
        };
        return result;
      },
      {},
    ),
  };
  return {
    ...normalize,
    withSecondaryButton,
  };
};
