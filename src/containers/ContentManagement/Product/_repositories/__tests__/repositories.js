import * as repositories from '../repositories';

describe('src/containers/ContentManagement/Product/_repositories/repositories', () => {
  test('getList', () => expect(repositories.getList({})).not.toBeNull());
  test('getMedia', () => expect(repositories.getMedia({})).not.toBeNull());
  test('deleteMedia', () => expect(repositories.deleteMedia(1)).not.toBeNull());
  test('fetchSubmitDocument', () => {
    expect(repositories.fetchSubmitDocument('test', 'POST')).not.toBeNull();
    expect(repositories.fetchSubmitDocument('test', 'PUT', 1)).not.toBeNull();
  });
  test('deleteDocument', () =>
    expect(repositories.deleteDocument(1)).not.toBeNull());
  test('deleteProduct', () =>
    expect(repositories.deleteProduct({})).not.toBeNull());
  test('updateProduct', () =>
    expect(repositories.updateProduct({})).not.toBeNull());
});
