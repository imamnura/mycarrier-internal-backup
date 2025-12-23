import * as actions from '../action';
import fetch from '../../../../utils/fetch';

jest.mock('@__old/utils/fetch');
const callback = jest.fn();
let dispatch;
beforeEach(() => {
  dispatch = jest.fn();
});

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

describe('src/components/forms/AddAMMappingCustomer/action', () => {
  it('calls dispatch submitAmMapping success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.submitAmMapping({
      userId: 123,
      data: {},
      callback,
    })(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  it('calls dispatch when submitAmMapping error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.submitAmMapping(123)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  it('calls dispatch searchAMMappingCustomer success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.searchAMMappingCustomer(123)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  it('calls dispatch when searchAMMappingCustomer error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.searchAMMappingCustomer(123)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});
