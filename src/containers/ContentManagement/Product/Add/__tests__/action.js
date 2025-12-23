import * as actions from '../action';
import fetch from '@__old/utils/fetch';

jest.mock('@__old/utils/fetch');

const mockFnResolve = () =>
  new Promise((resolve) =>
    resolve({
      data: [],
      meta: {
        page: 1,
        count: 10,
        totalPage: 10,
        totalData: 100,
      },
    }),
  );

const mockFnReject = () => new Promise((resolve, reject) => reject({}));

describe('src/containers/ContentManagement/Produc/Add/action', () => {
  let dispatch;
  const callback = jest.fn();

  beforeEach(() => {
    dispatch = jest.fn();
  });

  test('call reset', () => {
    actions.reset()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch addProduct success', async () => {
    const body = {};
    const redirect = jest.fn();
    const method = { method: 'POST' };
    const id = 1;
    await fetch.mockImplementation(mockFnResolve);
    await actions.addProduct({ body, callback, redirect, method, id })(
      dispatch,
    );
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  test('call dispatch addProduct error', async () => {
    const body = {};
    const redirect = jest.fn();
    const method = { method: 'POST' };
    const id = 1;
    await fetch.mockImplementation(mockFnReject);
    await actions.addProduct({ body, callback, redirect, method, id })(
      dispatch,
    );
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  test('call dispatch getProduct success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getProduct({ id: 1, callback })(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  test('call dispatch getProduct error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getProduct({ id: 1, callback })(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch getCategoryProduct level 0 success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getCategoryProduct('level 0', 'test')(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch getCategoryProduct level 1 success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getCategoryProduct('level 1', 'test')(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch getCategoryProduct level 2 success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getCategoryProduct('level 2', 'test')(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch getCategoryProduct error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getCategoryProduct('level 0', 'test')(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch getUrlMedia success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getUrlMedia({ data: {}, callback, id: 1 })(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  test('call dispatch getUrlMedia error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getUrlMedia({ data: {}, callback, id: 1 })(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch deleteMedia success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.deleteMedia('test')(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch deleteMedia error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.deleteMedia('test')(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('call dispatch setUpdateProduct success', () => {
    const product = jest.fn();
    actions.setUpdateProduct(product)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  describe('test section', () => {
    const page = [
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
    ];

    const block = [
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
    ];

    test('call dispatch createSection', () => {
      const page = jest.fn();
      actions.createSection(page)(dispatch);
      expect(dispatch).toHaveBeenCalled();
    });

    test('call dispatch updateSectionPage', () => {
      const page = jest.fn();
      actions.updateSectionPage(page)(dispatch);
      expect(dispatch).toHaveBeenCalled();
    });

    test('call dispatch setUpdateSection', () => {
      actions.setUpdateSection(page, block)(dispatch);
      expect(dispatch).toHaveBeenCalled();
    });

    test('call dispatch deleteSection', () => {
      actions.deleteSection(page, block)(dispatch);
      expect(dispatch).toHaveBeenCalled();
    });

    test('call dispatch setSection', () => {
      const data = {};
      actions.setSection(data)(dispatch);
      expect(dispatch).toHaveBeenCalled();
    });

    test('call dispatch validateSection', () => {
      const data = {};
      actions.validateSection(data)(dispatch);
      expect(dispatch).toHaveBeenCalled();
    });

    test('call dispatch deleteValidate', () => {
      actions.deleteValidate(page, 1)(dispatch);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
