import { getGeneralNewInstallStepper } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/General/utils', () => {
  test('getGeneralNewInstallStepper', () => {
    expect(getGeneralNewInstallStepper('rejected')).toEqual({
      active: 1,
      errors: 'rejected',
    });
    expect(getGeneralNewInstallStepper('customer returned')).toEqual({
      active: 1,
      errors: 'returned',
    });
    expect(getGeneralNewInstallStepper('am approval')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getGeneralNewInstallStepper('submitted')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getGeneralNewInstallStepper('approved')).toEqual({
      active: 3,
      errors: undefined,
    });
  });
});
