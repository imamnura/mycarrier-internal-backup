import { getSubscribeStepper } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail-v2/Subscribe/utils', () => {
  test('getSubscribeStepper', () => {
    expect(getSubscribeStepper('am approval')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getSubscribeStepper('delivery approval')).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getSubscribeStepper('am returned')).toEqual({
      active: 1,
      errors: 'returned',
    });
    expect(getSubscribeStepper('completed')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getSubscribeStepper('approved')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getSubscribeStepper('wds approved')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getSubscribeStepper('rejected')).toEqual({
      active: 0,
      errors: 'rejected',
      errorsLabel: 'Rejected',
    });
  });
});
