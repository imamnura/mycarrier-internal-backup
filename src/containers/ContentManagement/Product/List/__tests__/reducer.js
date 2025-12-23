import reducer, { initialState } from '../reducer';
import { ACTIONS } from '@constants';

describe('src/containers/ContentManagement/Product/List/reducer', () => {
  it('test the initial state default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('state productManagementSection toEqual initialState', () => {
    const { PRODUCT_MANAGEMENT_SECTION } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_MANAGEMENT_SECTION,
      data: [
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
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state productManagementMedia toEqual initialState', () => {
    const { PRODUCT_MANAGEMENT_MEDIA } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_MANAGEMENT_MEDIA,
      data: {},
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state productManagementAddSection toEqual initialState', () => {
    const { PRODUCT_MANAGEMENT_ADD_SECTION } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_MANAGEMENT_ADD_SECTION,
      data: {},
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state productManagementAdd toEqual initialState', () => {
    const { PRODUCT_MANAGEMENT_ADD } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_MANAGEMENT_ADD,
      data: initialState.product,
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state productManagementCategory toEqual initialState', () => {
    const {
      PRODUCT_MANAGEMENT_CATEGORY,
      PRODUCT_MANAGEMENT_CATEGORY1,
      PRODUCT_MANAGEMENT_CATEGORY2,
    } = ACTIONS;
    const reduceCategory = reducer(initialState, {
      type: PRODUCT_MANAGEMENT_CATEGORY,
      data: [],
    });
    const reduceCategory1 = reducer(initialState, {
      type: PRODUCT_MANAGEMENT_CATEGORY1,
      data: [],
    });
    const reduceCategory2 = reducer(initialState, {
      type: PRODUCT_MANAGEMENT_CATEGORY2,
      data: [],
    });

    expect(reduceCategory).toEqual({ ...initialState });
    expect(reduceCategory1).toEqual({ ...initialState });
    expect(reduceCategory2).toEqual({ ...initialState });
  });

  it('state productManagementPageValid toEqual initialState', () => {
    const { PRODUCT_MANAGEMENT_PAGE_VALID } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_MANAGEMENT_PAGE_VALID,
      data: [],
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state reset toEqual initialState', () => {
    const { RESET } = ACTIONS;
    const tree = reducer(initialState, {
      type: RESET,
      data: initialState,
    });
    expect(tree).toEqual({ ...initialState });
  });

  test('translate language', () => {
    const { PRODUCT_TRANSLATE_LANGUAGE } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_TRANSLATE_LANGUAGE,
      data: {},
    });
    expect(tree).not.toBeNull();
  });

  test('base language', () => {
    const { PRODUCT_BASE_LANGUAGE } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_BASE_LANGUAGE,
      data: [],
    });
    expect(tree).not.toBeNull();
  });

  test('localizations', () => {
    const { PRODUCT_LOCALIZATIONS } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_LOCALIZATIONS,
      data: [],
    });
    expect(tree).not.toBeNull();
  });

  test('active tab', () => {
    const { PRODUCT_ACTIVE_TAB } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_ACTIVE_TAB,
      data: 1,
    });
    expect(tree).not.toBeNull();
    expect(tree).not.toBeUndefined();
  });

  test('list language', () => {
    const { PRODUCT_LIST_LANGUAGE } = ACTIONS;
    const tree = reducer(initialState, {
      type: PRODUCT_LIST_LANGUAGE,
      data: [],
    });
    expect(tree).not.toBeNull();
    expect(tree).not.toBeUndefined();
  });
});
