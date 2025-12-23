import {
  getListModificationOrder,
  getFilterCustomerOptions,
  getFilterProductOptions,
} from '../repositories';

describe('src/pages/SMSA2P/Keyword/_repositories', () => {
  test('getFilterCustomerOptions', () => {
    expect(getFilterCustomerOptions({})).toBeTruthy();
  });

  test('getListModificationOrder', () => {
    expect(getListModificationOrder({})).toBeTruthy();
  });

  test('getFilterProductOptions', () => {
    expect(getFilterProductOptions({})).toBeTruthy();
  });
});
