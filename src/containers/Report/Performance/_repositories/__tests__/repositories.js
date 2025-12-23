import {
  getChartData,
  getList,
  downloadDetailData,
  getFilterCustomerOptions,
} from '../repositories';

describe('src/pages/PerformanceReport/_repositories', () => {
  test('getChartData', () => {
    expect(getChartData({}, 'po')).toBeTruthy();
    expect(getChartData({}, 'baso')).toBeTruthy();
    expect(getChartData({}, 'default')).toBeTruthy();
  });

  test('getList', () => {
    expect(getList({}, 'po')).toBeTruthy();
    expect(getList({}, 'bakes')).toBeFalsy();
    expect(getList({}, 'quotation')).toBeFalsy();
  });

  test('downloadDetailData', () => {
    expect(downloadDetailData('po', {})).toBeTruthy();
    expect(downloadDetailData('bakes', {})).toBeFalsy();
    expect(downloadDetailData('quotation', {})).toBeFalsy();
  });

  test('getFilterCustomerOptions', () => {
    expect(getFilterCustomerOptions('po')).toBeTruthy();
    expect(getFilterCustomerOptions('bakes')).toBeFalsy();
    expect(getFilterCustomerOptions('quotation')).toBeFalsy();
  });
});
