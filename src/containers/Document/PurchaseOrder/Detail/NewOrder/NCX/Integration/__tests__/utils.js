import { getNeucentrixStepper, getPurchaseOrderWorklog } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail/NewOrder/NCX/Integration/utils', () => {
  test('getNeucentrixStepper', () => {
    expect(getNeucentrixStepper('am approval')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getNeucentrixStepper('segment approval')).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getNeucentrixStepper('segment returned')).toEqual({
      active: 2,
      errors: 'returned',
    });
    expect(getNeucentrixStepper('delay order')).toEqual({
      active: 3,
      errors: undefined,
      warnings: 'delay order',
    });
    expect(getNeucentrixStepper('completed')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getNeucentrixStepper('rejected')).toEqual({
      active: 0,
      errors: 'rejected',
      errorsLabel: 'Rejected',
    });
  });

  test('getPurchaseOrderWorklog', () => {
    expect(
      getPurchaseOrderWorklog([
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
