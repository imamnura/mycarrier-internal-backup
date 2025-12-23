import {
  getListSender,
  getListOperatorSender,
  getListCustomerSender,
} from '../repositories';

describe('src/containers/SMSA2P/Bulk/_repositories', () => {
  test('getListSender', () => {
    expect(getListSender({})).toBeTruthy();
  });

  test('getListOperatorSender', () => {
    expect(getListOperatorSender({})).toBeTruthy();
  });

  test('getListCustomerSender', () => {
    expect(getListCustomerSender({})).toBeTruthy();
  });
});
