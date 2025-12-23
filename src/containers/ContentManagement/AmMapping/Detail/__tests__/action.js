import * as actions from '../action';
import fetch from '@__old/utils/fetch';

jest.mock('@__old/utils/fetch');
const dispatch = jest.fn();
const callback = jest.fn();

const mockFnResolve = () =>
  new Promise((resolve) =>
    resolve({
      data: [
        {
          metaData: {
            ccHandled: '',
          },
        },
      ],
      meta: {
        page: 1,
        count: 10,
        totalPage: 10,
        totalData: 100,
      },
    }),
  );
const mockFnReject = () => new Promise((resolve, reject) => reject({}));

describe('Test AmMapping Detail', () => {
  test('delete listCustomer success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.deleteListCustomer({
      id: 1,
      data: {},
      callback,
    })(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  test('delete listCustomer error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.deleteListCustomer({
      id: 1,
      data: {},
      callback,
    })(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  test('get AmMapping profile success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getAMMappingProfile({
      nik: '123',
    })(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('get listCustomer success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getListCustomer({
      params: {
        search: '',
        page: 1,
        size: 10,
      },
      id: 1,
      callback,
    })(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  test('get listCustomer not on page one', async () => {
    await actions.getListCustomer({
      params: {
        search: '',
        page: 2,
        size: 10,
      },
      id: 1,
      callback,
    })(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });
});
