import * as actions from '../action';
import fetch from '../../../../utils/fetch';

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

describe('src/components/fragments/SendOTP/action', () => {
  let callback = jest.fn();

  test('generateFile success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.generateFile({}, 'endpoint', callback);
    expect(callback).toHaveBeenCalled();
  });

  test('generateFile error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.generateFile({}, 'endpoint', callback);
    expect(callback).toHaveBeenCalled();
  });

  test('generatePreviewFile success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.generatePreviewFile({}, 'endpoint', callback);
    expect(callback).toHaveBeenCalled();
  });

  test('generatePreviewFile error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.generatePreviewFile({}, 'endpoint', callback);
    expect(callback).toHaveBeenCalled();
  });
});
