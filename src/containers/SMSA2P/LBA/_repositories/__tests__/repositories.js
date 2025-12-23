import {
  getListLBA,
  getListCustomerLBA,
  getDetailLBA,
  updateStatusLBA,
} from '../repositories';

describe('src/containers/SMSA2P/LBA/_repositories', () => {
  test('getListLBA', () => {
    expect(getListLBA()).toBeTruthy();
  });

  test('getListCustomerLBA', () => {
    expect(getListCustomerLBA()).toBeTruthy();
  });

  test('getDetailLBA', () => {
    expect(getDetailLBA({})).toBeTruthy();
  });

  test('updateStatusLBA', () => {
    expect(updateStatusLBA({})).toBeTruthy();
  });
});
