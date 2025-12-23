import * as repo from '../repositories';

describe('src/pages/ContentManagement/InterestedList/_repositories/repositories', () => {
  test('getList', () => expect(repo.getList({})).not.toBeNull());
  test('downloadList', () => expect(repo.downloadList({})).not.toBeNull());
  test('getSource', () => expect(repo.getSource()).not.toBeNull());
  test('getTabList', () => expect(repo.getTabList()).not.toBeNull());
  test('getListAM', () => expect(repo.getListAM()).not.toBeNull());
  test('getListCompany', () => expect(repo.getListCompany()).not.toBeNull());
  test('submitInterestMapping', () =>
    expect(repo.submitInterestMapping()).not.toBeNull());
  // test('getListUserStarclick', () => expect(repo.getListUserStarclick()).not.toBeNull());
  test('getStatusEmail', () => expect(repo.getStatusEmail()).not.toBeNull());
  test('getStatusWhatsapp', () =>
    expect(repo.getStatusWhatsapp()).not.toBeNull());
});
