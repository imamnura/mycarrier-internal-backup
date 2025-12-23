import {
  optionsType,
  languages,
  imageCaptionDesktop,
  imageCaptionMobile,
} from '../constant';

describe('src/containers/ContentManagement/Homepage/Create/Banner/constant', () => {
  test('optionsType', () => expect(optionsType).toBeTruthy());
  test('languages', () => expect(languages).toBeTruthy());
  test('imageCaptionDesktop', () =>
    expect(imageCaptionDesktop).toMatch(
      'Upload .png image, max 512 KB and size 1440 x 520 px',
    ));
  test('imageCaptionMobile', () =>
    expect(imageCaptionMobile).toMatch(
      'Upload .png image, max 512 KB and size 360 x 300 px',
    ));
});
