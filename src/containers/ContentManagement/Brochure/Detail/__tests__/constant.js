import { breadcrumb, handleSchema, normalizeDetail } from '../constant';

describe('src/containers/ContentManagement/Brochure/Detail/constant', () => {
  test('breadcrumb', () => expect(breadcrumb('1')).toBeTruthy());

  test('handleSchema', () => {
    expect(handleSchema({ typeOfLogin: 'Before Login' })).toBeTruthy();
    expect(handleSchema({ typeOfLogin: 'After Login' })).toBeTruthy();
  });

  test('normalizeDetail', () => {
    const data = {
      dateDownload: '2022-10-18T15:24:14.796Z',
      newsLetterStatus: true,
    };
    expect(normalizeDetail(data)).toBeTruthy();
    expect(normalizeDetail({ ...data, newsLetterStatus: false })).toBeTruthy();
  });
});
