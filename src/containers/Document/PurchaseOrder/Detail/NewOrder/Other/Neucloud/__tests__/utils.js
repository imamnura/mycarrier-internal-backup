import { getNeucloudStepper } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail/NewOrder/Other/Neucloud/utils', () => {
  test('getNeucloudStepper', () => {
    expect(getNeucloudStepper('am approval')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getNeucloudStepper('delivery approval')).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getNeucloudStepper('am returned')).toEqual({
      active: 1,
      errors: 'returned',
    });
    expect(getNeucloudStepper('provisioning')).toEqual({
      active: 3,
      errors: undefined,
    });
    expect(getNeucloudStepper('baso signed')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getNeucloudStepper('completed')).toEqual({
      active: 5,
      errors: undefined,
    });
  });
});
