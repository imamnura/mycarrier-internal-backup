import { getGameQooStepper, getGameQooWorklog } from '../utils';

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/GameQoo/utils', () => {
  test('getGameQooStepper', () => {
    expect(getGameQooStepper('am approval')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getGameQooStepper('returned')).toEqual({
      active: 1,
      errors: 'returned',
    });
    expect(getGameQooStepper('delivery approval')).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getGameQooStepper('provisioning')).toEqual({
      active: 3,
      errors: undefined,
    });
    expect(getGameQooStepper('baso signed')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getGameQooStepper('confirmation')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getGameQooStepper('completed')).toEqual({
      active: 5,
      errors: undefined,
    });
    expect(getGameQooStepper('rejected')).toEqual({
      active: 0,
      errors: 'rejected',
      errorsLabel: 'Rejected',
    });
  });

  test('getGameQooWorklog', () => {
    expect(
      getGameQooWorklog([
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
