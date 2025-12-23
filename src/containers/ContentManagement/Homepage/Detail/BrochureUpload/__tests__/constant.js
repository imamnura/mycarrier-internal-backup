import { breadcrumb, handleSchema } from '../constant';

describe('src/containers/ContentManagement/Homepage/Detail/BrochureUpload/constant', () => {
  test('breadcrumb', () => {
    expect(breadcrumb('test')).not.toBeNull();
  });

  test('handleSchema', () => {
    expect(handleSchema({})).not.toBeNull();
  });
});
