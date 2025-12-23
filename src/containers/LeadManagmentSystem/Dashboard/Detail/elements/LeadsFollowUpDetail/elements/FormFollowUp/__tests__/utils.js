import {
  pickMessageFollowUp,
  pickOptionType,
  pickOptionStatus,
} from '../utils';

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadFollowUpDetail/utils', () => {
  test('function', () => {
    expect(pickMessageFollowUp()).toBeFalsy();
    expect(pickMessageFollowUp('add')).toBeTruthy();
    expect(pickOptionType('default')).toBeTruthy();
    expect(pickOptionType('Delay Opportunity')).toBeTruthy();
    expect(pickOptionStatus('default')).toBeTruthy();
    expect(pickOptionStatus('Delay Opportunity')).toBeTruthy();
  });
});
