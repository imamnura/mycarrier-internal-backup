import { create_UUID } from '../utils';

export const payloadL0Information = (
  l0KeywordChip,
  formType,
  iconFile,
  getValues,
  getL0Information,
) => {
  return {
    name: getValues('l0ProductName'),
    slug: getValues('l0ProductSlug'),
    metaSeo: {
      ...getValues('l0MetaSeo'),
      keyword: l0KeywordChip,
    },
    type: getL0Information?.catId ? getL0Information.type : formType,
    level: '0',
    parentId: null,
    iconUrl: {
      fileName: getValues('iconL0')?.mediaName || '',
      fileUrl: getValues('iconL0')?.mediaPath || '',
    },
  };
};

export const payloadL0Content = (getValues) => {
  const localizationsId = {
    id: create_UUID(true),
    language: 'id',
    baseLanguage: true,
    metaData: [
      {
        _uid: create_UUID(true),
        status: true,
        component: 'banner',
        title: getValues('l0BannerTitleid'),
        description: getValues('l0BannerDescid'),
        imageUrl: {
          mediaId: getValues('l0imageBanner.mediaId') || '',
          mediaName: getValues('l0imageBanner.mediaName') || '',
          mediaPath: getValues('l0imageBanner.mediaPath') || '',
        },
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'headline',
        title: getValues('l0HeadlineTitleid'),
        description: getValues('l0HeadlineDescid'),
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'productServices',
        title: getValues('l0ProductServicesTitleid'),
      },
    ],
  };

  const localizationsEn = {
    id: create_UUID(true),
    language: 'en',
    baseLanguage: false,
    metaData: [
      {
        _uid: create_UUID(true),
        status: true,
        component: 'banner',
        title: getValues('l0BannerTitleen'),
        description: getValues('l0BannerDescen'),
        imageUrl: {
          mediaId: getValues('l0imageBanner.mediaId') || '',
          mediaName: getValues('l0imageBanner.mediaName') || '',
          mediaPath: getValues('l0imageBanner.mediaPath') || '',
        },
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'headline',
        title: getValues('l0HeadlineTitleen'),
        description: getValues('l0HeadlineDescen'),
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'productServices',
        title: getValues('l0ProductServicesTitleen'),
      },
    ],
  };

  const payloadContent = [{ ...localizationsId }, { ...localizationsEn }];

  return payloadContent;
};

export const payloadL1Information = (
  l1KeywordChip,
  category,
  getValues,
  getL0Information,
  getL1Information,
) => {
  return {
    name: getValues('l1ProductName'),
    slug: getValues('l1ProductSlug'),
    metaSeo: {
      ...getValues('l1MetaSeo'),
      keyword: l1KeywordChip,
    },
    level: '1',
    parentId: getL1Information?.catId
      ? getL1Information.parentId
      : getL0Information?.catId,
    productCategory: category,
  };
};

export const payloadL1Content = (getValues) => {
  const remapItemsId = [];
  const remapItemsEn = [];

  getValues('productDetailsId').map((v) => {
    remapItemsId.push({
      title: v.title,
      description: v.description,
    });
  });

  getValues('productDetailsEn').map((v) => {
    remapItemsEn.push({
      title: v.title,
      description: v.description,
    });
  });

  const localizationsId = {
    id: create_UUID(true),
    language: 'id',
    baseLanguage: true,
    metaData: [
      {
        _uid: create_UUID(true),
        status: true,
        component: 'banner',
        title: getValues('l1BannerTitleid'),
        description: getValues('l1BannerDescid'),
        imageUrl: {
          mediaId: getValues('l1imageBanner.mediaId') || '',
          mediaName: getValues('l1imageBanner.mediaName') || '',
          mediaPath: getValues('l1imageBanner.mediaPath') || '',
        },
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'headline',
        title: getValues('l1HeadlineTitleid'),
        description: getValues('l1HeadlineDescid'),
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'productDetail',
        items: remapItemsId,
      },
    ],
  };

  const localizationsEn = {
    id: create_UUID(true),
    language: 'en',
    baseLanguage: false,
    metaData: [
      {
        _uid: create_UUID(true),
        status: true,
        component: 'banner',
        title: getValues('l1BannerTitleen'),
        description: getValues('l1BannerDescen'),
        imageUrl: {
          mediaId: getValues('l1imageBanner.mediaId') || '',
          mediaName: getValues('l1imageBanner.mediaName') || '',
          mediaPath: getValues('l1imageBanner.mediaPath') || '',
        },
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'headline',
        title: getValues('l1HeadlineTitleen'),
        description: getValues('l1HeadlineDescen'),
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'productDetail',
        items: remapItemsEn,
      },
    ],
  };

  const payloadContent = [{ ...localizationsId }, { ...localizationsEn }];

  return payloadContent;
};

export const payloadL2Information = (l2KeywordChip, formType, getValues) => {
  return {
    name: getValues('l2ProductName'),
    slug: getValues('l2ProductSlug'),
    metaSeo: {
      ...getValues('l2MetaSeo'),
      keyword: l2KeywordChip,
    },
    level: '2',
    parentId: getValues('l2Mapping'), //string title dropdown l2 mapping
  };
};

export const payloadL2Content = (
  getValues,
  payloadDisableSection,
  getL0Information,
  formType,
) => {
  const localizationsId = {
    id: create_UUID(true),
    language: 'id',
    baseLanguage: true,
    metaData: [
      {
        _uid: create_UUID(true),
        status: true,
        component: 'hero',
        title: getValues('l2HeroTitleid'),
        description: getValues('l2HeroDescriptionid'),
        // icon: formType === 'edit' ? getValues('l2iconHero') : getL0Information?.iconUrl?.fileUrl,
        icon: getValues('l2iconHero')
          ? getValues('l2iconHero')
          : getL0Information?.iconUrl?.fileUrl,
        imageUrl: {
          mediaId: getValues('l2imageHero.mediaId') || '',
          mediaName: getValues('l2imageHero.mediaName') || '',
          mediaPath: getValues('l2imageHero.mediaPath') || '',
        },
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'overview',
        title: getValues('l2OverviewTitleid'),
        description: getValues('l2OverviewDescid'),
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'description',
        items: getValues('itemsProductDescriptionId'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productType,
        component: 'cardWithNumber',
        title: getValues('l2productDetailTypeTitleid'),
        description: getValues('l2productDetailTypeDescid'),
        items: getValues('l2TypeListid'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productBenefits,
        component: 'cardWithIcon',
        title: getValues('l2productDetailBenefitTitleid'),
        items: getValues('l2BenefitListid'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productSpesifications,
        component: 'productSpecifications',
        items: getValues('itemsProductSpesificationsId'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productQuality,
        component: 'qualityService',
        title: getValues('l2QualityServiceTitleid'),
        description: getValues('l2QualityServiceDescid'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productGuarantee,
        component: 'cardWithCaption',
        title: getValues('l2GuaranteeTitleid'),
        items: getValues('l2GuaranteeListid'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productMarketingToolkit,
        component: 'brochure',
        title:
          formType === 'single'
            ? getValues('l0ProductName')
            : getValues('l2ProductName'),
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'talkToUs',
        title:
          formType === 'single'
            ? getValues('l0ProductName')
            : getValues('l2ProductName'),
      },
    ],
  };

  const localizationsEn = {
    id: create_UUID(true),
    language: 'en',
    baseLanguage: false,
    metaData: [
      {
        _uid: create_UUID(true),
        status: true,
        component: 'hero',
        title: getValues('l2HeroTitleen'),
        description: getValues('l2HeroDescriptionen'),
        // icon: getL0Information?.iconUrl?.fileUrl,
        icon: getValues('l2iconHero')
          ? getValues('l2iconHero')
          : getL0Information?.iconUrl?.fileUrl,
        imageUrl: {
          mediaId: getValues('l2imageHero.mediaId') || '',
          mediaName: getValues('l2imageHero.mediaName') || '',
          mediaPath: getValues('l2imageHero.mediaPath') || '',
        },
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'overview',
        title: getValues('l2OverviewTitleen'),
        description: getValues('l2OverviewDescen'),
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'description',
        items: getValues('itemsProductDescriptionEn'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productType,
        component: 'cardWithNumber',
        title: getValues('l2productDetailTypeTitleen'),
        description: getValues('l2productDetailTypeDescen'),
        items: getValues('l2TypeListen'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productBenefits,
        component: 'cardWithIcon',
        title: getValues('l2productDetailBenefitTitleen'),
        items: getValues('l2BenefitListen'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productSpesifications,
        component: 'productSpecifications',
        items: getValues('itemsProductSpesificationsEn'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productQuality,
        component: 'qualityService',
        title: getValues('l2QualityServiceTitleen'),
        description: getValues('l2QualityServiceDescen'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productGuarantee,
        component: 'cardWithCaption',
        title: getValues('l2GuaranteeTitleen'),
        items: getValues('l2GuaranteeListen'),
      },
      {
        _uid: create_UUID(true),
        status: payloadDisableSection.productMarketingToolkit,
        component: 'brochure',
        title:
          formType === 'single'
            ? getValues('l0ProductName')
            : getValues('l2ProductName'),
      },
      {
        _uid: create_UUID(true),
        status: true,
        component: 'talkToUs',
        title:
          formType === 'single'
            ? getValues('l0ProductName')
            : getValues('l2ProductName'),
      },
    ],
  };

  const payloadContent = [{ ...localizationsId }, { ...localizationsEn }];

  return payloadContent;
};
