import {
  tableHeader,
  normalizeStatus,
  optionsFileType,
  searchPlaceholder,
} from '../constant';

describe('src/containers/ContentManagement/Homepage/List/constant', () => {
  test('tableHeader', () => {
    expect(tableHeader('bannerHero')).toBeTruthy();
    expect(tableHeader('brochure')).toBeTruthy();
  });

  test('normalizeStatus', () => {
    expect(normalizeStatus('active')).toBeTruthy();
    expect(normalizeStatus('hide')).toBeTruthy();
  });

  test('optionsFileType', () => {
    expect(optionsFileType).toBeTruthy();
  });

  test('searchPlaceholder', () => {
    expect(searchPlaceholder('bannerHero')).toBeTruthy();
    expect(searchPlaceholder('')).toBeTruthy();
  });
});
