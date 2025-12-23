import { getListKeyword, getListCustomerKeyword } from '../repositories';

describe('src/pages/SMSA2P/Keyword/_repositories', () => {
  test('getListCustomerKeyword', () => {
    expect(getListCustomerKeyword({})).toBeTruthy();
  });

  test('getListKeyword', () => {
    expect(getListKeyword({})).toBeTruthy();
  });
});
