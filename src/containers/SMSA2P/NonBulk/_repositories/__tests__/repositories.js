import {
  getListNonBulk,
  getDetailNonBulk,
  getListCustomerNonBulk,
  getDetailCampaign,
  updateStatusNonBulk,
  getDropdownOption,
  updateNonBulk,
  checkBrandName,
  uploadFile,
} from '../repositories';

describe('src/pages/NonBulk/_repositories', () => {
  test('getListCustomerNonBulk', () => {
    expect(getListCustomerNonBulk({})).toBeTruthy();
  });

  test('getListNonBulk', () => {
    expect(getListNonBulk({})).toBeTruthy();
  });

  test('getDetailNonBulk', () => {
    expect(getDetailNonBulk({})).toBeTruthy();
  });

  test('getDetailCampaign', () => {
    expect(getDetailCampaign({})).toBeTruthy();
  });

  test('updateStatusNonBulk', () => {
    expect(updateStatusNonBulk({})).toBeTruthy();
  });

  test('getDropdownOption', () => {
    expect(getDropdownOption({})).toBeTruthy();
  });

  test('uploadFile', () => {
    expect(uploadFile({})).toBeTruthy();
  });

  test('updateNonBulk', () => {
    expect(updateNonBulk({})).toBeTruthy();
  });

  test('checkBrandName', () => {
    expect(checkBrandName({})).toBeTruthy();
  });
});
