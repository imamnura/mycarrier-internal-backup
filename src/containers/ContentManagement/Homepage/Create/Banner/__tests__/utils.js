import { normalizeDetail } from '../utils';

describe('src/pages/ContentManagement/Homepage/Create/Banner/utils', () => {
  const data = {
    localizations: [
      { title: 'title 1', description: 'desc 1' },
      { title: 'title 2', description: 'desc 2' },
    ],
    urlType: 'internal',
    productId: 1,
  };

  const dataEksternal = {
    ...data,
    urlType: 'eksternal',
    linkedTo: 'test',
  };
  test('normalizeDetail type internal', () =>
    expect(normalizeDetail(data)).not.toBeNull());
  test('normalizeDetail type ekternal', () =>
    expect(normalizeDetail(dataEksternal)).not.toBeNull());
});
