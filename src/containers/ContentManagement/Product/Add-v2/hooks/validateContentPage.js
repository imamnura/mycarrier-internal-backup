export const L0ContentPage = (getValues) => {
  const watchImageBanner = getValues('l0imageBanner');
  const isBtnNext = !watchImageBanner?.mediaPath;

  return isBtnNext;
};

export const L1ContentPage = (getValues) => {
  const watchImageBanner = getValues('l1imageBanner');

  // validasi untuk product detail, tapi update nya telat karna pake useWatch sementara tidak dipake
  // const watchProductDetailsId = getValues('productDetailsId');
  // const watchProductDetailsEn = getValues('productDetailsEn');
  // const areTrue = (arr) => arr.every(el => el?.description);
  // const isValidProductDetailId = !areTrue(watchProductDetailsId);
  // const isValidProductDetailEn = !areTrue(watchProductDetailsEn);

  const isBtnNext = !watchImageBanner?.mediaPath;

  return isBtnNext;
};

export const L2ContentPage = (getValues) => {
  const watchImageHero = getValues('l2imageHero');
  const isBtnNext = !watchImageHero?.mediaPath;

  return isBtnNext;
};
