import * as actions from '../action';
import fetch from '../../../../utils/fetch';

jest.mock('@__old/utils/fetch');

describe('src/components/fragments/SendOTP/action', () => {
  let dispatch = jest.fn();
  let callback = jest.fn();

  test('sendOTP success', () => {
    fetch.mockResolvedValue({
      data: [],
      meta: {
        page: 1,
        count: 10,
        totalPage: 10,
        totalData: 100,
      },
    });
    actions.sendOTP('id', 'key', 'endpoint', callback, false)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('sendOTP success resend', () => {
    fetch.mockResolvedValue({
      data: {
        endOTP: true,
      },
    });
    actions.sendOTP('id', 'key', 'endpoint', callback, true)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('verifyOTP success', () => {
    fetch.mockResolvedValue({
      data: {
        endOTP: true,
      },
    });
    actions.verifyOTP(
      'id',
      'key',
      'endpoint',
      123,
      callback,
      'noe',
      callback,
    )();
    expect(callback).toHaveBeenCalled();
  });

  test('sendOTP error', () => {
    fetch.mockRejectedValue({});
    actions.sendOTP('id', 'key', 'endpoint', callback, false)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('sendOTP error endOTP', () => {
    fetch.mockRejectedValue({});
    actions.sendOTP('id', 'key', 'endpoint', callback, false)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });

  test('verifyOTP error', () => {
    fetch.mockRejectedValue({});
    actions.verifyOTP(
      'id',
      'key',
      'endpoint',
      123,
      callback,
      'noe',
      callback,
    )();
    expect(callback).toHaveBeenCalled();
  });
});
