import {
  getListUser,
  getAMProfile,
  getCustomerProfile,
  addAMMapping,
} from '../repositories';

describe('src/containers/ContentManagement/AmMapping/_repositories/repositories', () => {
  test('getListUser', () => {
    expect(getListUser({})).not.toBeNull();
  });
  test('getAMProfile', () => {
    expect(getAMProfile()).not.toBeNull();
  });
  test('getCustomerProfile', () => {
    expect(getCustomerProfile()).not.toBeNull();
  });
  test('addAMMapping', () => {
    expect(addAMMapping()).not.toBeNull();
  });
});
