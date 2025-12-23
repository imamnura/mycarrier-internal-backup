export const normalizeDetail = (data) => {
  return {
    eventRegistration: data?.eventRegistration,
    pastLink: data?.pastLink,
    relatedProduct: data?.relatedProduct?.items,
    startDate: data?.startDate,
    endDate: data?.endDate,
    titleid: data?.localizations[0]?.title,
    titleen: data?.localizations[1]?.title,
    slugid: data?.localizations[0]?.slug,
    slugen: data?.localizations[1]?.slug,
    location: data?.location,
    typeLocation: data?.typeLocation,
    imageBanner: data?.imageBanner,
    descriptionid: data?.localizations[0]?.description,
    descriptionen: data?.localizations[1]?.description,
    speakers: data?.speakers?.items,
    attendees: data?.attendees?.items,
    sponsors: data?.sponsors?.items,
    rundownid: data?.localizations[0]?.rundown?.items,
    rundownen: data?.localizations[1]?.rundown?.items,
  };
};
