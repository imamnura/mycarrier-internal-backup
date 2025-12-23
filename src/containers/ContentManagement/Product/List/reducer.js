import { ACTIONS } from '@constants';

export const initialState = {
  page: [
    {
      _uid: 'defaultID',
      status: true,
      component: 'bannerRight',
      title: 'Ketik konten judul di sini dalam Bahasa..',
      description: 'Ketik deskripsi konten di sini dalam Bahasa..',
      imageUrl: {
        mediaPath: 'link gambar disini..',
      },
    },
  ],
  setSection: {},
  media: {},
  category: [],
  category1: [],
  category2: [],
  product: {
    productName: '',
    epicProduct: false,
    epicParameter: '',
    productIconUrl: 'product icon',
    productSlug: '',
    meta: {
      title: '',
      description: '',
      keyword: [],
    },
    category: [{}, {}, {}],
    localizations: [
      {
        id: '',
        language: '',
        baseLanguage: true,
        createdAt: '',
        metaData: [
          {
            _uid: 'defaultID',
            status: true,
            component: 'bannerRight',
            title: 'Ketik konten judul di sini dalam Bahasa..',
            description: 'Ketik deskripsi konten di sini dalam Bahasa..',
            imageUrl: {
              mediaPath: 'link gambar disini..',
            },
          },
        ],
      },
    ],
    documents: [],
  },
  pageValid: [],
  baseLanguage: [],
  translateLanguage: {},
  localizations: [],
  activeTab: 0,
  listLanguage: [
    { id: '1', lang: 'Bahasa Indonesia', value: 'id' },
    { id: '2', lang: 'Inggris', value: 'en' },
  ],
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const {
    PRODUCT_MANAGEMENT_SECTION,
    PRODUCT_MANAGEMENT_MEDIA,
    PRODUCT_MANAGEMENT_ADD_SECTION,
    PRODUCT_MANAGEMENT_CATEGORY,
    PRODUCT_MANAGEMENT_CATEGORY1,
    PRODUCT_MANAGEMENT_CATEGORY2,
    PRODUCT_MANAGEMENT_ADD,
    PRODUCT_MANAGEMENT_PAGE_VALID,
    PRODUCT_LOCALIZATIONS,
    PRODUCT_BASE_LANGUAGE,
    PRODUCT_TRANSLATE_LANGUAGE,
    PRODUCT_ACTIVE_TAB,
    PRODUCT_LIST_LANGUAGE,
    RESET,
  } = ACTIONS;

  switch (type) {
    case PRODUCT_MANAGEMENT_SECTION:
      return {
        ...state,
        page: data,
      };

    case PRODUCT_MANAGEMENT_MEDIA:
      return {
        ...state,
        media: data,
      };

    case PRODUCT_MANAGEMENT_ADD_SECTION:
      return {
        ...state,
        setSection: data,
      };

    case PRODUCT_MANAGEMENT_ADD:
      return {
        ...state,
        product: data,
      };

    case PRODUCT_MANAGEMENT_CATEGORY:
      return {
        ...state,
        category: data,
      };

    case PRODUCT_MANAGEMENT_CATEGORY1:
      return {
        ...state,
        category1: data,
      };

    case PRODUCT_MANAGEMENT_CATEGORY2:
      return {
        ...state,
        category2: data,
      };

    case PRODUCT_MANAGEMENT_PAGE_VALID:
      return {
        ...state,
        pageValid: data,
      };

    case PRODUCT_TRANSLATE_LANGUAGE:
      return {
        ...state,
        translateLanguage: data,
      };

    case PRODUCT_BASE_LANGUAGE:
      return {
        ...state,
        baseLanguage: data,
      };

    case PRODUCT_LOCALIZATIONS:
      return {
        ...state,
        localizations: data,
      };

    case PRODUCT_ACTIVE_TAB:
      return {
        ...state,
        activeTab: data,
      };

    case PRODUCT_LIST_LANGUAGE:
      return {
        ...state,
        listLanguage: data,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
}
