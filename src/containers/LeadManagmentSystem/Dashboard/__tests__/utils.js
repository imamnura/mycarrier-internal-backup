import { maskLeadStatus, maskOrderHeaderStatus } from '../utils';

describe('src/containers/LeadManagementSystem/Dashboard/utils', () => {
  test('func', () => {
    expect(maskLeadStatus('need_validation')).toBeTruthy();
    expect(maskLeadStatus('test error')).toBeTruthy();
    expect(maskOrderHeaderStatus('submitted')).toBeTruthy();
    expect(maskOrderHeaderStatus('test error')).toBeTruthy();
  });
});
