import { getTrialStepper } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail-v2/Subscribe/utils', () => {
  test('getTrialStepper', () => {
    expect(getTrialStepper('am approval')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getTrialStepper('delivery approval')).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getTrialStepper('am returned')).toEqual({
      active: 1,
      errors: 'returned',
    });
    expect(getTrialStepper('completed')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getTrialStepper('approved')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getTrialStepper('wds approved')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getTrialStepper('rejected')).toEqual({
      active: 0,
      errors: 'rejected',
      errorsLabel: 'Rejected',
    });
  });
});
