import {
  getFilterCustomerOptions,
  getFilterProductOptions,
  getListPurchaseOrder,
  getDetail,
  updateStatus,
  getOptionBakes,
  uploadFile,
} from '../repositories';

describe('src/pages/Document/Bakes/_repositories', () => {
  test('getFilterCustomerOptions', () => {
    expect(getFilterCustomerOptions()).toBeTruthy();
  });

  test('getFilterProductOptions', () => {
    expect(getFilterProductOptions()).toBeTruthy();
  });

  test('getListPurchaseOrder', () => {
    expect(getListPurchaseOrder({})).toBeTruthy();
  });

  test('getDetail', () => {
    expect(getDetail({})).toBeTruthy();
  });

  test('updateStatus', () => {
    expect(updateStatus({})).toBeTruthy();
  });

  test('getOptionBakes', () => {
    expect(getOptionBakes({})).toBeTruthy();
  });

  test('uploadFile', () => {
    expect(uploadFile({})).toBeTruthy();
  });
});
