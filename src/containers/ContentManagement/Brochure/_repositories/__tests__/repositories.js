import * as repositories from '../repositories';

describe('src/containers/ContentManagement/Brochure/_repositories/repositories', () => {
  test('getList', () => expect(repositories.getList()).not.toBeNull());
  test('getProduct', () => expect(repositories.getProduct()).not.toBeNull());
  test('getDetailBrochure', () =>
    expect(repositories.getDetailBrochure(1)).not.toBeNull());
});
