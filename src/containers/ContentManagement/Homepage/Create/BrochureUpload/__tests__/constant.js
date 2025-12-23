import { imageCaption } from '../constant';

describe('src/containers/ContentManagement/Homepage/Create/BrochureUpload/constant', () => {
  test('imageCaption', () =>
    expect(imageCaption).toMatch('Upload .pdf, .jpg or .png image, max 10 MB'));
});
