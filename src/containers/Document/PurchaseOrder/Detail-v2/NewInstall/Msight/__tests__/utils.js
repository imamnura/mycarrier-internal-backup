import { keyDataSchema, getMsightStepper } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/Msight/utils', () => {
  test('keyDataSchema', () => {
    expect(keyDataSchema(true)).toHaveLength(2);
    expect(keyDataSchema(false)).toHaveLength(1);
  });

  test('getMsightStepper', () => {
    expect(getMsightStepper('rejected', false)).toEqual({
      active: 1,
      errors: 'rejected',
    });
    expect(getMsightStepper('delivery returned', false)).toEqual({
      active: 2,
      errors: 'returned',
    });
    expect(getMsightStepper('delivery approval', false)).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getMsightStepper('submitted', false)).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getMsightStepper('am approval', false)).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getMsightStepper('operator checking', true)).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getMsightStepper('customer agreement', false)).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getMsightStepper('operator approval', false)).toEqual({
      active: 5,
      errors: undefined,
    });
    expect(getMsightStepper('actived', false)).toEqual({
      active: 6,
      errors: undefined,
    });
  });
});
