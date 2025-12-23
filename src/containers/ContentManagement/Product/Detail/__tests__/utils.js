import {
  breadcrumb,
  handleDeleteMessage,
  productTypeList,
  handleSchema,
} from '../utils';

describe('src/containers/ContentManagement/Product/Detail', () => {
  test('breadcrumb', () => expect(breadcrumb).not.toBeNull());

  test('handleDeleteMessage', () => {
    expect(handleDeleteMessage('l1')).toBeTruthy();
    expect(handleDeleteMessage('l2')).toBeTruthy();
    expect(handleDeleteMessage('l3')).toBeTruthy();
  });

  test('productTypeList', () => expect(productTypeList).toBeTruthy());

  test('handleSchema', () => expect(handleSchema({}, {})).not.toBeNull());
});
