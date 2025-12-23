import { getListCustomerUMB, getListUMB } from '../repositories';

describe('src/containers/SMSA2P/UMB/_repositories', () => {
  test('getListCustomerUMB', () => {
    expect(getListCustomerUMB({})).toBeTruthy();
  });

  test('getListUMB', () => {
    expect(getListUMB({})).toBeTruthy();
  });
});
