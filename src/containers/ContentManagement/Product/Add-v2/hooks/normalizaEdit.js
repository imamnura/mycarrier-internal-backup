import { dummyText, dummyTextEng, defaultValueForm } from '../constant';

export const normalizeEditData = (data, level, step, getValues) => {
  const getDataInfo = JSON.parse(localStorage.getItem(`${level}Information`));

  if (level === 'l0') {
    if (step === 'information') {
      return {
        // GENERAL
        name: data?.name || '',
        parentId: data?.parentId || '',
        category: [],

        // PRODUCT INFORMATION
        // iconUrl: data?.iconUrl || '',
        iconUrl: getValues('iconL0') || data?.iconUrl || '',
        keyword: data?.metaSeo?.keyword || [],
        l0ProductName: data?.name || '',
        l0ProductSlug: data?.slug || '',
        l0MetaSeo: {
          title: data?.metaSeo?.title || '',
          description: data?.metaSeo?.description || '',
        },
        l0MetaKeyword: '',
        isSingleProduct: data?.isSingleProduct || false,
        // l2iconHero: data?.iconUrl?.fileUrl || '', //icon url
        l2iconHero: getValues('l2iconHero') || data?.iconUrl?.fileUrl || '', //icon url
      };
    }

    if (step === 'content') {
      if (getDataInfo?.isSingleProduct) {
        return normalizePDPContent(data, level);
      }

      const banner = findComponent(data, 'banner');
      const headline = findComponent(data, 'headline');
      const productServices = findComponent(data, 'productServices');

      return {
        // BANNER
        l0imageBanner: {
          mediaId: banner?.id?.imageUrl?.mediaId || '',
          mediaName: banner?.id?.imageUrl?.mediaName || '',
          mediaPath: banner?.id?.imageUrl?.mediaPath || '',
        },
        l0BannerTitleid: banner?.id?.title || '',
        l0BannerDescid:
          (banner?.id?.description &&
            banner?.id?.description.replace(/(<([^>]+)>)/gi, '')) ||
          '',
        l0BannerTitleen: banner?.en?.title || '',
        l0BannerDescen:
          (banner?.en?.description &&
            banner?.en?.description.replace(/(<([^>]+)>)/gi, '')) ||
          '',

        // HEADLINE
        l0HeadlineTitleid: headline?.id?.title || '',
        l0HeadlineDescid:
          (headline?.id?.description &&
            headline?.id?.description.replace(/(<([^>]+)>)/gi, '')) ||
          '',
        l0HeadlineTitleen: headline?.en?.title || '',
        l0HeadlineDescen:
          (headline?.en?.description &&
            headline?.en?.description.replace(/(<([^>]+)>)/gi, '')) ||
          '',

        // PRODUCT AND SERVICES
        l0ProductServicesTitleid: productServices?.id?.title || '',
        l0ProductServicesTitleen: productServices?.en?.title || '',
        cardList: {
          id: productServices?.id?.products || [],
          en: productServices?.en?.products || [],
        },
      };
    }
  }

  if (level === 'l1') {
    if (step === 'information') {
      return {
        // GENERAL
        name: data?.name || '',
        parentId: data?.parentId || '',
        category: data?.category || [],
        categoryName: data?.categoryName || [],

        // PRODUCT INFORMATION
        keyword: data?.metaSeo?.keyword || [],
        l1ProductName: data?.name || '',
        l1ProductSlug: data?.slug || '',
        l1MetaSeo: {
          title: data?.metaSeo?.title || '',
          description: data?.metaSeo?.description || '',
        },
        l1MetaKeyword: '',
        isSingleProduct: data?.isSingleProduct || false,
        // l2iconHero: data?.iconUrl?.fileUrl || '', //icon url
        l2iconHero: getValues('l2iconHero') || data?.iconUrl?.fileUrl || '', //icon url
      };
    }

    if (step === 'content') {
      if (getDataInfo?.isSingleProduct) {
        return normalizePDPContent(data, level);
      }

      const banner = findComponent(data, 'banner');
      const headline = findComponent(data, 'headline');
      const productDetail = findComponent(data, 'productDetail');
      const productDetailCards = findComponent(data, 'productDetailCards');

      return {
        // BANNER
        l1imageBanner: {
          mediaId: banner?.id?.imageUrl?.mediaId || '',
          mediaName: banner?.id?.imageUrl?.mediaName || '',
          mediaPath: banner?.id?.imageUrl?.mediaPath || '',
        },
        l1BannerTitleid: banner?.id?.title || '',
        l1BannerDescid:
          (banner?.id?.description &&
            banner?.id?.description.replace(/(<([^>]+)>)/gi, '')) ||
          '',
        l1BannerTitleen: banner?.en?.title || '',
        l1BannerDescen:
          (banner?.en?.description &&
            banner?.en?.description.replace(/(<([^>]+)>)/gi, '')) ||
          '',

        // HEADLINE
        l1HeadlineTitleid: headline?.id?.title || '',
        l1HeadlineDescid:
          (headline?.id?.description &&
            headline?.id?.description.replace(/(<([^>]+)>)/gi, '')) ||
          '',
        l1HeadlineTitleen: headline?.en?.title || '',
        l1HeadlineDescen:
          (headline?.en?.description &&
            headline?.en?.description.replace(/(<([^>]+)>)/gi, '')) ||
          '',

        // PRODUCT DETAILS
        cardList: productDetailCards,
        productDetailDataId: productDetail?.id?.items || [],
        productDetailDataEn: productDetail?.en?.items || [],
      };
    }
  }

  if (level === 'l2') {
    if (step === 'information') {
      const mappingList = [];
      data?.mappingList?.map((v) => {
        mappingList.push({
          label: v,
          value: v,
        });
      });

      return {
        // GENERAL
        name: data?.name || '',
        parentId: data?.parentId || '',
        category: data?.category || [],
        categoryName: data?.categoryName || [],

        // PRODUCT INFORMATION
        keyword: data?.metaSeo?.keyword || [],
        l2ProductName: data?.name || '',
        l2ProductSlug: data?.slug || '',
        l2MetaSeo: {
          title: data?.metaSeo?.title || '',
          description: data?.metaSeo?.description || '',
        },
        l2MetaKeyword: '',
        l2Mapping: data?.parentId || '',
        mappingList: mappingList || [],
        // l2iconHero: data?.iconUrl?.fileUrl || '', //icon url
        l2iconHero: getValues('l2iconHero') || data?.iconUrl?.fileUrl || '', //icon url
        catIdl0: data?.catIdl0 || '',
      };
    }

    if (step === 'content') {
      return normalizePDPContent(data, level);
    }
  }
};

const normalizePDPContent = (data, level) => {
  const getDataInfo = JSON.parse(localStorage.getItem(`${level}Information`));
  const productNameLogo = findComponent(data, 'hero');
  const productOverview = findComponent(data, 'overview');
  const productDescription = findComponent(data, 'description');
  const productType = findComponent(data, 'cardWithNumber');
  const productBenefits = findComponent(data, 'cardWithIcon');
  const productSpesifications = findComponent(data, 'productSpecifications');
  const productQualityService = findComponent(data, 'qualityService');
  const serviceLevelGuarantee = findComponent(data, 'cardWithCaption');
  const serviceProductBrochure = findComponent(data, 'brochure');
  // const serviceTalkToUs = findComponent(data, 'talkToUs');

  let titleProductDescriptionId = [];
  let titleProductDescriptionEn = [];
  productDescription?.id?.items.map((v) => {
    titleProductDescriptionId.push({
      title: v.title || '',
    });
  });
  productDescription?.en?.items.map((v) => {
    titleProductDescriptionEn.push({
      title: v.title || '',
    });
  });

  let titleProductSpesificationsId = [];
  let titleProductSpesificationsEn = [];
  productSpesifications?.id?.items.map((v) => {
    titleProductSpesificationsId.push({
      title: v.title || '',
    });
  });
  productSpesifications?.en?.items.map((v) => {
    titleProductSpesificationsEn.push({
      title: v.title || '',
    });
  });

  return {
    // PRODUCTS NAME & LOGO
    l2HeroTitleid: productNameLogo?.id?.title || '',
    l2HeroTitleen: productNameLogo?.en?.title || '',
    l2HeroDescriptionid:
      productNameLogo?.id?.description || dummyText.description,
    l2HeroDescriptionen:
      productNameLogo?.en?.description || dummyTextEng.description,
    l2imageHero: productNameLogo?.id?.imageUrl || '', //background
    // l2iconHero: productNameLogo?.id?.icon || '', //icon url
    // l2ProductName: serviceTalkToUs?.id?.title || '', //product name

    // // PRODUCT OVERVIEW
    l2OverviewTitleid: productOverview?.id?.title || '',
    l2OverviewTitleen: productOverview?.en?.title || '',
    l2OverviewDescid:
      (productOverview?.id?.description &&
        productOverview?.id?.description.replace(/(<([^>]+)>)/gi, '')) ||
      '',
    l2OverviewDescen:
      (productOverview?.en?.description &&
        productOverview?.en?.description.replace(/(<([^>]+)>)/gi, '')) ||
      '',

    // PRODUCT DESCRIPTION
    itemsProductDescriptionId:
      productDescription?.id?.items || defaultValueForm?.l2ProductDescriptionid,
    itemsProductDescriptionEn:
      productDescription?.en?.items || defaultValueForm?.l2ProductDescriptionen,
    l2ProductDescriptionid:
      productDescription?.id?.items || defaultValueForm?.l2ProductDescriptionid,
    l2ProductDescriptionen:
      productDescription?.en?.items || defaultValueForm?.l2ProductDescriptionen,

    // PRODUCT TYPES
    l2productDetailTypeTitleid: productType?.id?.title || '',
    l2productDetailTypeTitleen: productType?.en?.title || '',
    l2productDetailTypeDescid:
      (productType?.id?.description &&
        productType?.id?.description.replace(/(<([^>]+)>)/gi, '')) ||
      '',
    l2productDetailTypeDescen:
      (productType?.en?.description &&
        productType?.en?.description.replace(/(<([^>]+)>)/gi, '')) ||
      '',
    l2TypeListid: productType?.id?.items,
    l2TypeListen: productType?.en?.items,
    l2TypeStatus: Boolean(productType?.id?.status),

    // PRODUCT BENEFITS
    l2productDetailBenefitTitleid: productBenefits?.id?.title || '',
    l2productDetailBenefitTitleen: productBenefits?.en?.title || '',
    l2BenefitListid: productBenefits?.id?.items,
    l2BenefitListen: productBenefits?.en?.items,
    l2BenefitStatus: Boolean(productBenefits?.id?.status),

    // PRODUCT SPESIFICATIONS
    itemsProductSpesificationsId:
      productSpesifications?.id?.items ||
      defaultValueForm?.l2ProductSpesificationsid,
    itemsProductSpesificationsEn:
      productSpesifications?.en?.items ||
      defaultValueForm?.l2ProductSpesificationsen,
    l2ProductSpesificationsid:
      productSpesifications?.id?.items ||
      defaultValueForm?.l2ProductSpesificationsid,
    l2ProductSpesificationsen:
      productSpesifications?.en?.items ||
      defaultValueForm?.l2ProductSpesificationsen,
    l2ProductSpesificationStatus: Boolean(productSpesifications?.id?.status),

    // QUALITY OF SERVICE
    l2QualityServiceTitleid: productQualityService?.id?.title || '',
    l2QualityServiceTitleen: productQualityService?.en?.title || '',
    l2QualityServiceDescid:
      productQualityService?.id?.description || dummyText.description,
    l2QualityServiceDescen:
      productQualityService?.en?.description || dummyTextEng.description,
    l2QualityServiceStatus: Boolean(productQualityService?.id?.status),

    // SERVICE LEVEL GUARANTEE
    l2GuaranteeTitleid: serviceLevelGuarantee?.id?.title || '',
    l2GuaranteeTitleen: serviceLevelGuarantee?.en?.title || '',
    l2GuaranteeListid: serviceLevelGuarantee?.id?.items,
    l2GuaranteeListen: serviceLevelGuarantee?.en?.items,
    l2GuaranteeStatus: Boolean(serviceLevelGuarantee?.id?.status),

    // MARKETING TOOL KIT
    l2documentsList: getDataInfo?.documents || [],
    l2documentsStatus: Boolean(serviceProductBrochure?.id?.status),
  };
};

const findComponent = (data, name) => {
  const localizationsId = data?.find(({ language }) => language === 'id');
  const localizationsEn = data?.find(({ language }) => language === 'en');

  if (name === 'banner' || name === 'bannerRight') {
    return {
      id: localizationsId?.metaData?.find(
        ({ component }) =>
          component === 'banner' || component === 'bannerRight',
      ),
      en: localizationsEn?.metaData?.find(
        ({ component }) =>
          component === 'banner' || component === 'bannerRight',
      ),
    };
  }

  if (name === 'productServices') {
    return {
      id: {
        title: localizationsId?.metaData?.find(
          ({ component }) => component === name,
        )?.title,
        products: localizationsId?.cardList || [],
      },
      en: {
        title: localizationsEn?.metaData?.find(
          ({ component }) => component === name,
        )?.title,
        products: localizationsEn?.cardList || [],
      },
    };
  }

  if (name === 'productDetailCards') {
    return {
      id: localizationsId?.cardList || [],
      en: localizationsEn?.cardList || [],
    };
  }

  return {
    id: localizationsId?.metaData?.find(({ component }) => component === name),
    en: localizationsEn?.metaData?.find(({ component }) => component === name),
  };
};
