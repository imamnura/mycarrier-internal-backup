import { normalizeDetail } from '../normalizeDetail';

describe('src/containers/ContentManagement/Article/Create/hooks/normalizeDetail', () => {
  test('normalizeDetail', () => {
    const data = {
      localization: [
        { title: 'test', caption: 'test' },
        { title: 'test', caption: 'test' },
      ],
    };
    expect(normalizeDetail(data)).toBeTruthy();
  });
});
