import { getModifyDisconnectStepper } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail-v2/ModifyDisconnect/utils', () => {
  test('getModifyDisconnectStepper', () => {
    expect(getModifyDisconnectStepper('rejected')).toEqual({
      active: 1,
      errors: 'rejected',
    });
    expect(getModifyDisconnectStepper('am approval')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getModifyDisconnectStepper('submitted')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getModifyDisconnectStepper('am returned')).toEqual({
      active: 2,
      errors: 'returned',
    });
    expect(getModifyDisconnectStepper('approved')).toEqual({
      active: 3,
      errors: undefined,
    });
    expect(getModifyDisconnectStepper('completed')).toEqual({
      active: 5,
      errors: undefined,
    });
  });
});
