import * as actions from '../action';
import fetch from '../../../../utils/fetch';

jest.mock('@__old/utils/common');
jest.mock('@__old/utils/fetch');

let dispatch;

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

const callback = jest.fn();

beforeEach(() => {
  dispatch = jest.fn();
});

it('calls dispatch when getNotification success', async () => {
  await fetch.mockImplementation(mockFnResolve);
  await actions.getNotification({
    params: {
      size: 15,
      page: 1,
      search: '',
      sort: 'newest',
    },
    callback,
  })(dispatch);
  expect(dispatch).toHaveBeenCalled();
});

it('calls dispatch getNotification params page more than 1', async () => {
  await fetch.mockImplementation(mockFnResolve);
  await actions.getNotification({
    params: {
      size: 15,
      page: 2,
      search: '',
      sort: '',
    },
    callback,
  })(dispatch);
  expect(dispatch).toHaveBeenCalled();
});

it('calls callback when getAMMapping error', async () => {
  await fetch.mockImplementation(mockFnReject);
  await actions.getNotification({
    params: {
      size: 15,
      page: 1,
      search: '',
      status: '',
    },
    callback,
  })(dispatch);
  expect(callback).toHaveBeenCalled();
});

it('calls callback when readNotification success', async () => {
  await fetch.mockImplementation(mockFnResolve);
  await actions.readNotification({
    data: {
      data: [],
    },
    callback,
  })(dispatch);
  expect(callback).toHaveBeenCalled();
});

it('clickNotification success', async () => {
  await fetch.mockImplementation(mockFnResolve);
  await actions.clickNotification()(dispatch);
  expect(dispatch).toHaveBeenCalled();
});
