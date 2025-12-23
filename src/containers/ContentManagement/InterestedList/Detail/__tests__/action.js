import * as actions from '../action';
import fetch from '@__old/utils/fetch';

jest.mock('@__old/utils/fetch');

let dispatch;

const mockFnResolveStatusInvalid = () =>
  new Promise((resolve) =>
    resolve({
      data: {
        status: 'Invalid',
      },
    }),
  );
const mockFnResolve = () =>
  new Promise((resolve) =>
    resolve({
      data: {
        status: '',
      },
    }),
  );

const mockFnReject = () => new Promise((resolve, reject) => reject({}));

const callback = jest.fn();

beforeEach(() => {
  dispatch = jest.fn();
});

describe('src/pages/ContentManagement/InterestedList/Detail/action', () => {
  const options = {
    id: 1,
    data: {
      status: '',
    },
    callback,
  };

  it('calls dispatch getInterestedDetail success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getInterestedDetail(1, callback)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  it('calls callback getInterestedDetail success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.getInterestedDetail(1, callback)(dispatch);
    expect(callback).toHaveBeenCalled();
  });

  it('calls callback getInterestedDetail error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.getInterestedDetail(1, callback)(dispatch);
    expect(callback).toHaveBeenCalled();
  });

  it('submit mapping success', async () => {
    await fetch.mockImplementation(mockFnResolve);
    await actions.submitInterestMapping(options)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it('submit mapping success status Invalid', async () => {
    await fetch.mockImplementation(mockFnResolveStatusInvalid);
    await actions.submitInterestMapping(options)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it('submit mapping error', async () => {
    await fetch.mockImplementation(mockFnReject);
    await actions.submitInterestMapping(options)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});
