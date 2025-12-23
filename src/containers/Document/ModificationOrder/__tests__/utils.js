import {
  getModificationOrderStepper,
  getModificationOrderWorklog,
} from '../utils';

describe('src/pages/Document/ModificationOrder', () => {
  it('getModificationOrderStepper', () => {
    expect(getModificationOrderStepper('Review Bakes')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getModificationOrderStepper('Rejected')).toEqual({
      active: 1,
      errors: 'rejected',
    });
    expect(getModificationOrderStepper('Returned')).toEqual({
      active: 1,
      errors: 'returned',
    });
    expect(getModificationOrderStepper('Service Upgrading')).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getModificationOrderStepper('BASO Sign')).toEqual({
      active: 3,
      errors: undefined,
    });
    expect(getModificationOrderStepper('Upgrade Complete')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getModificationOrderStepper('Downgrade Complete')).toEqual({
      active: 6,
      errors: undefined,
    });
  });

  it('getModificationOrderWorklog', () => {
    expect(
      getModificationOrderWorklog([
        {
          caption: 'Request for upgrade service created by Customer',
          date: '04/04/2022 03:08:29',
          status: 'Request',
          step: 0,
          title: 'CUSTOMER | REQUEST',
        },
        {
          noteProgress: 'TEST',
          caption: 'Request for upgrade service created by Customer',
          date: '04/04/2022 03:08:29',
          status: 'Request',
          step: 0,
          title: 'CUSTOMER | REQUEST',
        },
        {
          date: '04/04/2022 03:08:29',
          status: 'Request',
          step: 0,
          title: 'CUSTOMER | REQUEST',
        },
        {
          date: '04/04/2022 03:08:29',
          status: 'Request',
          step: 0,
        },
      ]),
    ).toBeTruthy();
  });
});
