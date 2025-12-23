import {
  getListBaso,
  getFilterCustomerOptions,
  getFilterProductOptions,
  getFilterSegmentOptions,
  getFilterAmOptions,
} from '../repositories';

describe('src/Pages/Document/Baso/Repositories', () => {
  test('getListBaso', () => {
    expect(getListBaso({})).not.toBeNull();
  });
  test('getFilterCustomerOptions', () => {
    expect(getFilterCustomerOptions({})).not.toBeNull();
  });
  test('getFilterProductOptions', () => {
    expect(getFilterProductOptions({})).not.toBeNull();
  });
  test('getFilterSegmentOptions', () => {
    expect(getFilterSegmentOptions({})).not.toBeNull();
  });
  test('getFilterAmOptions', () => {
    expect(getFilterAmOptions({})).not.toBeNull();
  });
});
