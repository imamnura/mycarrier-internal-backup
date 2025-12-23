export const normalizeDetail = (data) => {
  const fileImageDesktop = new File(
    [data?.imageUrl],
    data?.imageUrl?.desktop.split('/').pop(),
    { type: 'png' },
  );

  const fileImageMobile = new File(
    [data?.imageUrl],
    data?.imageUrl?.mobile.split('/').pop(),
    { type: 'png' },
  );

  return {
    titleid: data?.localizations[0].title,
    titleen: data?.localizations[1].title,
    descriptionid: data?.localizations[0].description,
    descriptionen: data?.localizations[1].description,
    type: data?.urlType,
    linkedTo: data?.productId?.toString(),
    linkedToEksternal: data?.urlType === 'eksternal' ? data?.linkedTo : '',
    imageDesktop: {
      file: fileImageDesktop,
      fileName: data?.imageUrl?.desktop?.split('/').pop(),
      data: { mediaPath: data?.imageUrl?.desktop },
    },
    imageMobile: {
      file: fileImageMobile,
      fileName: data?.imageUrl?.mobile?.split('/').pop(),
      data: { mediaPath: data?.imageUrl?.mobile },
    },
  };
};
