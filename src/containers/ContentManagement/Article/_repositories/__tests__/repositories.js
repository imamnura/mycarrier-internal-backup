import * as repositories from '../repositories';

describe('src/containers/ContentManagement/Article/_repositories/repositories', () => {
  test('getList', () => expect(repositories.getList({})).not.toBeNull());
  test('deleteArticle', () =>
    expect(repositories.deleteArticle({})).not.toBeNull());
  test('getArticle', () => expect(repositories.getArticle({})).not.toBeNull());
  test('submitArticle', () => {
    expect(
      repositories.submitArticle({ data: 'test', method: 'POST' }),
    ).not.toBeNull();
    expect(
      repositories.submitArticle({ data: 'test', method: 'PUT', id: '1' }),
    ).not.toBeNull();
  });
  test('getUrlMedia', () =>
    expect(repositories.getUrlMedia({})).not.toBeNull());
  test('deleteMedia', () =>
    expect(repositories.deleteMedia({})).not.toBeNull());
  test('getListProduct', () =>
    expect(repositories.getListProduct()).not.toBeNull());
});
