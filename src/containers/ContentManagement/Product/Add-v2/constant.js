import { create_uuid } from '@utils/common';

export const fullSteps = [
  'L0 - Product Information',
  'L0 - Content Page',
  'L1 - Product Information',
  'L1 - Content Page',
  'Product Detail - Product Information',
  'Product Detail - Content Page',
];

export const halfSteps = [
  'L0 - Product Information',
  'L0 - Content Page',
  'L1 - Product Information',
  'L1 - Content Page',
];

export const singleSteps = ['L0 - Product Information', 'L0 - Content Page'];

export const editSteps = (level) => {
  if (level === '2') {
    return [
      'Product Detail - Product Information',
      'Product Detail - Content Page',
    ];
  }

  return [`L${level} - Product Information`, `L${level} - Content Page`];
};

export const languages = [
  {
    label: 'Bahasa Indonesia',
    value: 'id',
  },
  {
    label: 'English',
    value: 'en',
  },
];

export const dummyText = {
  title: 'Ketik konten judul di sini dalam Bahasa..',
  description: 'Ketik deskripsi konten di sini dalam Bahasa..',
  image: 'Link gambar disini..',
  titleProduct: 'Ketik judul tipe produk di sini..',
  descProduct: 'Ketik deskripsi tipe produk di sini..',
  titleProductBenefits: 'Ketik judul kartu di sini..',
  descProductBenefits: 'Ketik deskripsi kartu di sini..',
  titleCard: 'Ketik judul kartu..',
  caption: 'Caption..',
  logo: 'Ketik nama logo di sini..',
  scroll: 'Geser kebawah',
};

export const dummyTextEng = {
  title: 'Type the content of the title here in English..',
  description: 'Type content description here in English..',
  image: 'Image link here..',
  titleProduct: 'Type the product type title here..',
  descProduct: 'Type the product type description here..',
  titleProductBenefits: 'Type the card title here..',
  descProductBenefits: 'Type the card description here..',
  titleCard: 'Type the title of the card..',
  caption: 'Caption..',
  logo: 'Type the logo name here..',
  scroll: 'Scroll down to see more',
};

export const defaultValueForm = {
  // LEVEL 0
  l0ProductName: '',
  l0ProductSlug: '',
  l0MetaSeo: {
    title: '',
    description: '',
  },
  iconL0: null,
  l0BannerTitleid: '',
  l0BannerTitleen: '',
  l0imageBanner: {
    mediaId: '',
    mediaName: '',
    mediaPath: '',
  },

  // LEVEL 1
  l1BannerTitleid: '',
  l1BannerTitleen: '',

  // LEVEL 2
  l2HeroTitleid: '',
  l2HeroTitleen: '',
  l2HeroDescriptionid: dummyText.description,
  l2HeroDescriptionen: dummyTextEng.description,
  l2QualityServiceDescid: dummyText.description,
  l2QualityServiceDescen: dummyTextEng.description,
  l2ProductDescriptionid: [
    {
      id: create_uuid(16),
      title: '',
      description: dummyText.description,
      imageUrl: {
        mediaId: '',
        mediaName: '',
        mediaPath: '',
      },
    },
  ],
  l2ProductDescriptionen: [
    {
      id: create_uuid(16),
      title: '',
      description: dummyTextEng.description,
      imageUrl: {
        mediaId: '',
        mediaName: '',
        mediaPath: '',
      },
    },
  ],
  l2ProductSpesificationsid: [
    {
      id: create_uuid(16),
      title: '',
      description: dummyText.description,
      imageUrl: {
        mediaId: '',
        mediaName: '',
        mediaPath: '',
      },
    },
  ],
  l2ProductSpesificationsen: [
    {
      id: create_uuid(16),
      title: '',
      description: dummyTextEng.description,
      imageUrl: {
        mediaId: '',
        mediaName: '',
        mediaPath: '',
      },
    },
  ],
  l2TypeListid: [],
  l2TypeListen: [],
  l2BenefitListid: [],
  l2BenefitListen: [],
  l2GuaranteeListid: [],
  l2GuaranteeListen: [],
};

export const messageSuccess = (formType, level) => {
  let message = '';
  if (formType === 'full')
    return (message =
      'All Page (Level 0, Level 1, Level 2 Category & Product Detail) was successfully submitted');
  if (formType === 'half')
    return (message =
      'All Page (Level 0 & Level 1) was successfully submitted');
  if (formType === 'single')
    return (message = 'Level 0 page was successfully submitted');
  if (formType === 'edit') {
    if (level === 'l0') return (message = 'Level 0 Page successfully edited');
    if (level === 'l1') return (message = 'Level 1 Page successfully edited');
    if (level === 'l2')
      return (message = 'Product Detail Page successfully edited');
  }
  if (formType === 'create') {
    if (level === 'l1') return (message = 'Level 1 Page successfully created');
    if (level === 'l2')
      // eslint-disable-next-line no-unused-vars
      return (message = 'Product Detail Page successfully created');
  }
};
