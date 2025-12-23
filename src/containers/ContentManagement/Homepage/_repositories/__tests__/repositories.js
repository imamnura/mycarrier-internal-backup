import * as repositories from '../repositories';

describe('src/containers/ContentManagement/Homepage/_repositories/repositories', () => {
  test('getList', () => {
    expect(repositories.getList({ tab: 'bannerHero' })).not.toBeNull();
    expect(repositories.getList({ tab: 'events' })).not.toBeNull();
    expect(repositories.getList({ tab: 'brochure' })).not.toBeNull();
  });
  test('fetchSubmitBrochure', () => {
    expect(
      repositories.fetchSubmitBrochure(
        { data: 'test', method: 'POST' },
        'POST',
      ),
    ).not.toBeNull();
    expect(
      repositories.fetchSubmitBrochure(
        { data: 'test', method: 'PUT' },
        'PUT',
        '1',
      ),
    ).not.toBeNull();
  });
  test('getUrlMedia', () =>
    expect(repositories.getUrlMedia({})).not.toBeNull());
  test('deleteMedia', () =>
    expect(repositories.deleteMedia({})).not.toBeNull());
  test('getDetailBrochure', () =>
    expect(repositories.getDetailBrochure('1')).not.toBeNull());
  test('deleteBrochure', () =>
    expect(repositories.deleteBrochure('1')).not.toBeNull());
  test('fetchSubmitContent', () => {
    expect(
      repositories.fetchSubmitContent({ data: 'test', method: 'POST' }),
    ).not.toBeNull();
    expect(
      repositories.fetchSubmitContent({ data: 'test', method: 'PUT', id: '1' }),
    ).not.toBeNull();
  });
  test('translateText', () =>
    expect(
      repositories.translateText({ params: 'test', data: 'test' }),
    ).not.toBeNull());
  test('saveTranslate', () => {
    expect(
      repositories.saveTranslate({
        localizations: [{ language: 'id' }],
        data: 'test',
      }),
    ).not.toBeNull();
    expect(
      repositories.saveTranslate({
        localizations: [{ language: 'en' }],
        data: 'test',
      }),
    ).not.toBeNull();
    expect(
      repositories.saveTranslate({
        localizations: [{ language: 'test' }],
        data: 'test',
      }),
    ).not.toBeNull();
  });
  test('getDetailBanner', () =>
    expect(repositories.getDetailBanner('1')).not.toBeNull());
  test('getListProduct', () =>
    expect(repositories.getListProduct()).not.toBeNull());
  test('updateShowHide', () =>
    expect(
      repositories.updateShowHide({
        id: 'test',
        data: {},
        tabActive: 'bannerHero',
      }),
    ).not.toBeNull());
  test('deleteContent', () =>
    expect(repositories.deleteContent('1')).not.toBeNull());
  test('checkValidationUnique', () => {
    expect(
      repositories.checkValidationUnique({
        data: 'test',
        type: 'news',
        action: 'test',
        id: 'test',
      }),
    ).not.toBeNull();
  });
});
