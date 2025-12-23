export const normalizeDetail = (data) => {
  const fileImage = new File([data?.imageUrl], data?.imageUrl?.mediaName, {
    type: 'png',
  });

  return {
    categoryArticle: data?.categoryArticle,
    nameid: data?.localization[0]?.title,
    nameen: data?.localization[1]?.title,
    captionid: data?.localization[0]?.caption,
    captionen: data?.localization[1]?.caption,
    imageFile: {
      data: data?.imageUrl,
      file: fileImage,
      fileName: data?.imageUrl?.mediaName,
    },
    storyid: data?.localization[0]?.story,
    storyen: data?.localization[1]?.story,
  };
};
