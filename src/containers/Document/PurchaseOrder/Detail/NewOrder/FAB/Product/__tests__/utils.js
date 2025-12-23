import { getFabProductStepper, getFabProductWorklog } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail/NewOrder/FAB/Product/utils', () => {
  test('getFabProductStepper', () => {
    expect(getFabProductStepper('am approval')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getFabProductStepper('returned')).toEqual({
      active: 1,
      errors: 'returned',
    });
    expect(getFabProductStepper('segment approval')).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getFabProductStepper('delivery approval')).toEqual({
      active: 3,
      errors: undefined,
    });
    expect(getFabProductStepper('provisioning')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getFabProductStepper('baso signed')).toEqual({
      active: 5,
      errors: undefined,
    });
    expect(getFabProductStepper('completed')).toEqual({
      active: 6,
      errors: undefined,
    });
    expect(getFabProductStepper('rejected')).toEqual({
      active: 0,
      errors: 'rejected',
      errorsLabel: 'Rejected',
    });
  });

  test('getFabProductWorklog', () => {
    expect(
      getFabProductWorklog([
        {
          step: 0,
          status: 'submitted',
          dateTime: '2023-09-05T07:05:44.584Z',
          note: 'Document Submitted',
          noteProgress: '',
          createdBy: 'c7fadb73-d8ed-433b-829c-302f599b7a10',
        },
        {
          step: 1,
          status: 'operator checking',
          dateTime: '2023-09-05T07:05:44.584Z',
          note: 'Checking',
          noteProgress: '',
          createdBy: 'c7fadb73-d8ed-433b-829c-302f599b7a10',
        },
      ]),
    ).toBeTruthy();
  });
});
