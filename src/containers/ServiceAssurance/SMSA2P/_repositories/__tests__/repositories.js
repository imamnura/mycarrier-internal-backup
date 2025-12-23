import { getList, downloadList } from '../repositories';

describe('src/pages/ServiceAssurance/SMSA2P/_repositories/repositories', () => {
  test('getList', () => {
    expect(getList({})).not.toBeNull();
  });

  test('downloadData', () => {
    expect(downloadList({})).not.toBeNull();
  });
});
