import { dummyTextId, dummyTextEn, languages, imageCaption } from '../constant';

describe('src/containers/ContentManagement/Article/Create/constant', () => {
  test('dummyTextId', () =>
    expect(dummyTextId).toMatch('Ketik story konten di sini dalam Bahasa..'));

  test('dummyTextEn', () =>
    expect(dummyTextEn).toMatch('Type content story here in English..'));

  test('imageCaption', () => expect(imageCaption).toBeTruthy());

  test('languages', () => expect(languages).toBeTruthy());
});
