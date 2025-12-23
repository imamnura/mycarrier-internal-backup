import { getFilterCompanyOptions, getListBakes } from '../repositories';

describe('src/pages/Document/Bakes/_repositories', () => {
  test('getFilterCompanyOptions', () => {
    expect(getFilterCompanyOptions({})).toBeTruthy();
  });

  test('getListBakes', () => {
    expect(getListBakes({})).toBeTruthy();
  });
});
