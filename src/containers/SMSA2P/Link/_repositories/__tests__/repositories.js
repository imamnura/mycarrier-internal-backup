import { getListCustomerLink, getListLinkActivation } from '../repositories';

describe('src/containers/SMSA2P/Link/_repositories', () => {
  test('getListLinkActivation', () => {
    expect(getListLinkActivation({})).toBeTruthy();
  });

  test('getListCustomerLink', () => {
    expect(getListCustomerLink({})).toBeTruthy();
  });
});
