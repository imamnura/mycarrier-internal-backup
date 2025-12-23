import * as actions from '../action';
import fetch from '../../../../__old/utils/fetch';

jest.mock('@__old/utils/fetch');
const mockFnResolve = () =>
  new Promise((resolve) =>
    resolve({
      data: [],
    }),
  );

const mockFnReject = () => new Promise((resolve, reject) => reject({}));

describe('src/pages/Microsite/ApprovalBakes/action', () => {
  let dispatch;
  const setAlert = jest.fn();
  const setData = jest.fn();
  beforeEach(() => {
    dispatch = jest.fn();
  });

  test('getApprovalBakes success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getApprovalBakes('id', setData)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('getApprovalBakes error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getApprovalBakes('id', setData)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('updateStatus success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.updateStatus('id', {}, setAlert, setData)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('updateStatus error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.updateStatus('id', {}, setAlert, setData)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});
