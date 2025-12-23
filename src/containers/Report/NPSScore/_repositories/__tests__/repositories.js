import {
  getOptionsCustomer,
  getOptionsProduct,
  getNPSReport,
  downloadDetailData,
  putCheckedNPS,
  getDropdownOption,
} from '../repositories';

describe('src/pages/NPSScore/_repositories', () => {
  test('getOptionsCustomer', () => {
    expect(getOptionsCustomer('evaluate')).not.toBeNull();
    expect(getOptionsCustomer('activate')).not.toBeNull();
    expect(getOptionsCustomer('getSupport')).not.toBeNull();
  });

  test('getOptionsProduct', () => {
    expect(getOptionsProduct('evaluate')).not.toBeNull();
    expect(getOptionsProduct('activate')).not.toBeNull();
    expect(getOptionsProduct('getSupport')).not.toBeNull();
  });

  test('downloadDetailData', () => {
    expect(downloadDetailData({}, 'evaluate')).not.toBeNull();
    expect(downloadDetailData({}, 'activate')).not.toBeNull();
    expect(downloadDetailData({}, 'getSupport')).not.toBeNull();
  });

  test('getNPSReport', () => {
    expect(getNPSReport({ journey: 'evaluate' })).not.toBeNull();
    // expect(getNPSReport({ journey : 'activate' })).not.toBeNull();
    // expect(getNPSReport({ journey : 'getsupport' })).not.toBeNull();
  });

  test('putCheckedNPS', () => {
    expect(putCheckedNPS('', { status: true })).not.toBeNull();
    expect(putCheckedNPS('', { status: false })).not.toBeNull();
  });

  test('getDropdownOption', () => {
    expect(
      getDropdownOption({ params: { type: 'email' } }, 'getSupport'),
    ).not.toBeNull();
  });
});
