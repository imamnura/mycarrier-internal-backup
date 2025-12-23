import * as yup from 'yup';

const getFieldValidation = (step, formType, query) => {
  const getL0Information = JSON.parse(localStorage.getItem('l0Information'));
  const getL1Information = JSON.parse(localStorage.getItem('l1Information'));

  switch (step) {
    case 'L0 - Product Information':
      return {
        l0ProductName: yup.string().max(60).required().label('Product Name'),
        l0ProductSlug: yup.string().max(60).required().label('Product Slug'),
        l0MetaSeo: yup.object().shape({
          title: yup.string().max(40).required().label('Meta Title'),
          description: yup
            .string()
            .max(160)
            .required()
            .label('Meta Description'),
        }),
      };

    case 'L0 - Content Page':
      if (formType === 'single' || getL0Information?.isSingleProduct) {
        // return validate l2 content page
        return PDPValidation();
      }
      return {
        l0BannerTitleid: yup.string().max(200).required().label('Title Banner'),
        l0BannerTitleen: yup.string().max(200).required().label('Title Banner'),
        l0BannerDescid: yup
          .string()
          .max(1500)
          .required()
          .label('Description Banner'),
        l0BannerDescen: yup
          .string()
          .max(1500)
          .required()
          .label('Description Banner'),

        l0HeadlineTitleid: yup
          .string()
          .max(200)
          .required()
          .label('Title Headline'),
        l0HeadlineTitleen: yup
          .string()
          .max(200)
          .required()
          .label('Title Headline'),
        l0HeadlineDescid: yup
          .string()
          .max(1500)
          .required()
          .label('Description Headline'),
        l0HeadlineDescen: yup
          .string()
          .max(1500)
          .required()
          .label('Description Headline'),

        l0ProductServicesTitleid: yup
          .string()
          .max(200)
          .required()
          .label('Title Products Services'),
        l0ProductServicesTitleen: yup
          .string()
          .max(1500)
          .required()
          .label('Title Products Services'),
      };

    case 'L1 - Product Information':
      return {
        l1ProductName: yup.string().max(60).required().label('Product Name'),
        l1ProductSlug: yup.string().max(60).required().label('Product Slug'),
        l1MetaSeo: yup.object().shape({
          title: yup.string().max(40).required().label('Meta Title'),
          description: yup
            .string()
            .max(160)
            .required()
            .label('Meta Description'),
        }),
      };

    case 'L1 - Content Page':
      if (
        formType === 'half' ||
        (formType === 'create' && query.isSingleProduct === 'true') ||
        getL1Information?.isSingleProduct
      ) {
        // return validate l2 content page
        return PDPValidation();
      }
      return {
        l1BannerTitleid: yup.string().max(200).required().label('Title Banner'),
        l1BannerTitleen: yup.string().max(200).required().label('Title Banner'),
        l1BannerDescid: yup
          .string()
          .max(1500)
          .required()
          .label('Description Banner'),
        l1BannerDescen: yup
          .string()
          .max(1500)
          .required()
          .label('Description Banner'),

        l1HeadlineTitleid: yup
          .string()
          .max(200)
          .required()
          .label('Title Headline'),
        l1HeadlineTitleen: yup
          .string()
          .max(200)
          .required()
          .label('Title Headline'),
        l1HeadlineDescid: yup
          .string()
          .max(1500)
          .required()
          .label('Description Headline'),
        l1HeadlineDescen: yup
          .string()
          .max(1500)
          .required()
          .label('Description Headline'),

        // product service title & description di handle di validateContentPage.js
        productDetailsId: yup
          .array()
          .of(
            yup.object().shape({
              title: yup
                .string()
                .max(200)
                .required()
                .label('Title Product Detail'),
              description: yup
                .string()
                .max(1500)
                .required()
                .label('Description Product Detail'),
            }),
          )
          .required(),
        productDetailsEn: yup
          .array()
          .of(
            yup.object().shape({
              title: yup
                .string()
                .max(200)
                .required()
                .label('Title Product Detail'),
              description: yup
                .string()
                .max(1500)
                .required()
                .label('Description Product Detail'),
            }),
          )
          .required(),
      };

    case 'Product Detail - Product Information':
      return {
        l2ProductName: yup.string().max(60).required().label('Product Name'),
        l2ProductSlug: yup.string().max(60).required().label('Product Slug'),
        l2MetaSeo: yup.object().shape({
          title: yup.string().max(40).required().label('Meta Title'),
          description: yup
            .string()
            .max(160)
            .required()
            .label('Meta Description'),
        }),
        l2Mapping: yup.string().required(),
      };

    case 'Product Detail - Content Page':
      return PDPValidation();
    default:
      return {};
  }
};

const PDPValidation = () => {
  return {
    //section hero use form field
    l2HeroTitleid: yup.string().max(200).required().label('Name & Logo Title'),
    l2HeroTitleen: yup.string().max(200).required().label('Name & Logo Title'),
    l2HeroDescriptionid: yup.mixed().required().label('Hero Description'),
    l2HeroDescriptionen: yup.mixed().required().label('Hero Description'),

    //section overview
    l2OverviewTitleid: yup.string().max(200).required().label('Overview Title'),
    l2OverviewTitleen: yup.string().max(200).required().label('Overview Title'),
    l2OverviewDescid: yup
      .string()
      .max(1500)
      .required()
      .label('Overview Description'),
    l2OverviewDescen: yup
      .string()
      .max(1500)
      .required()
      .label('Overview Description'),

    //section description
    l2ProductDescriptionid: yup
      .array()
      .of(
        yup.object().shape({
          title: yup
            .string()
            .max(200)
            .required()
            .label('Title Product Description'),
        }),
      )
      .min(1)
      .required()
      .label('Product Description'),
    l2ProductDescriptionen: yup
      .array()
      .of(
        yup.object().shape({
          title: yup
            .string()
            .max(200)
            .required()
            .label('Title Product Description'),
        }),
      )
      .min(1)
      .required()
      .label('Product Description'),
    itemsProductDescriptionId: yup
      .array()
      .of(
        yup.object().shape({
          // title: yup.string().max(200).required().label('Title Product Description'),
          description: yup
            .mixed()
            .required()
            .label('Description Product Description'),
          imageUrl: yup.object().shape({
            mediaId: yup.string().required().label('Image Media Id'),
            mediaName: yup.string().required().label('Image Media Name'),
            mediaPath: yup.string().required().label('Image Media Path'),
          }),
        }),
      )
      .min(1)
      .required()
      .label('Product Description'),
    itemsProductDescriptionEn: yup
      .array()
      .of(
        yup.object().shape({
          // title: yup.string().max(200).required().label('Title Product Description'),
          description: yup
            .mixed()
            .required()
            .label('Description Product Description'),
          imageUrl: yup.object().shape({
            mediaId: yup.string().required().label('Image Media Id'),
            mediaName: yup.string().required().label('Image Media Name'),
            mediaPath: yup.string().required().label('Image Media Path'),
          }),
        }),
      )
      .min(1)
      .required()
      .label('Product Description'),

    //section types
    l2productDetailTypeTitleid: yup.string().max(200).label('Types Title'),
    l2productDetailTypeDescid: yup
      .string()
      .max(1500)
      .label('Types Description'),
    l2productDetailTypeTitleen: yup.string().max(200).label('Types Title'),
    l2productDetailTypeDescen: yup
      .string()
      .max(1500)
      .label('Types Description'),
    l2TypeListid: yup.array().of(
      yup.object().shape({
        title: yup.string().max(40).label('Title Product Type'),
        description: yup.string().max(1500).label('Description Product Type'),
      }),
    ),
    l2TypeListen: yup.array().of(
      yup.object().shape({
        title: yup.string().max(40).label('Title Product Type'),
        description: yup.string().max(1500).label('Description Product Type'),
      }),
    ),

    //section benefit
    l2productDetailBenefitTitleid: yup
      .string()
      .max(200)
      .label('Benefits Title'),
    l2productDetailBenefitTitleen: yup
      .string()
      .max(200)
      .label('Benefits Title'),
    l2BenefitListid: yup.array().of(
      yup.object().shape({
        title: yup.string().max(40).label('Title Product Benefit'),
        description: yup
          .string()
          .max(1500)
          .label('Description Product Benefit'),
      }),
    ),
    l2BenefitListen: yup.array().of(
      yup.object().shape({
        title: yup.string().max(40).label('Title Product Benefit'),
        description: yup
          .string()
          .max(1500)
          .label('Description Product Benefit'),
      }),
    ),

    //section spesification
    l2ProductSpesificationsid: yup.array().of(
      yup.object().shape({
        title: yup.string().max(200).label('Title Product Description'),
        description: yup.mixed().label('Description Product Description'),
        imageUrl: yup.object().shape({
          mediaId: yup.string().label('Image Media Id'),
          mediaName: yup.string().label('Image Media Name'),
          mediaPath: yup.string().label('Image Media Path'),
        }),
      }),
    ),
    l2ProductSpesificationsen: yup.array().of(
      yup.object().shape({
        title: yup.string().max(200).label('Title Product Description'),
        description: yup.mixed().label('Description Product Description'),
        imageUrl: yup.object().shape({
          mediaId: yup.string().label('Image Media Id'),
          mediaName: yup.string().label('Image Media Name'),
          mediaPath: yup.string().label('Image Media Path'),
        }),
      }),
    ),
    itemsProductSpesificationsId: yup.array().of(
      yup.object().shape({
        title: yup.string().max(200).label('Title Product Description'),
        description: yup.mixed().label('Description Product Description'),
        imageUrl: yup.object().shape({
          mediaId: yup.string().label('Image Media Id'),
          mediaName: yup.string().label('Image Media Name'),
          mediaPath: yup.string().label('Image Media Path'),
        }),
      }),
    ),
    itemsProductSpesificationsEn: yup.array().of(
      yup.object().shape({
        title: yup.string().max(200).label('Title Product Description'),
        description: yup.mixed().label('Description Product Description'),
        imageUrl: yup.object().shape({
          mediaId: yup.string().label('Image Media Id'),
          mediaName: yup.string().label('Image Media Name'),
          mediaPath: yup.string().label('Image Media Path'),
        }),
      }),
    ),

    //section quality service
    l2QualityServiceTitleid: yup
      .string()
      .max(200)
      .label('Quality of Service Title'),
    l2QualityServiceTitleen: yup
      .string()
      .max(200)
      .label('Quality of Service Title'),

    //section guarantee
    l2GuaranteeTitleid: yup
      .string()
      .max(200)
      .label('Service Level Guarantee Title'),
    l2GuaranteeTitleen: yup
      .string()
      .max(200)
      .label('Service Level Guarantee Title'),
    l2GuaranteeListid: yup.array().of(
      yup.object().shape({
        title: yup.string().max(40).label('Title Service Level Guarantee'),
        caption: yup
          .string()
          .max(1500)
          .label('Description Service Level Guarantee'),
      }),
    ),
    l2GuaranteeListen: yup.array().of(
      yup.object().shape({
        title: yup.string().max(40).label('Title Service Level Guarantee'),
        caption: yup
          .string()
          .max(1500)
          .label('Description Service Level Guarantee'),
      }),
    ),
  };
};

export const validation = (step, formType, query) => {
  return yup.object().shape(getFieldValidation(step, formType, query));
};
