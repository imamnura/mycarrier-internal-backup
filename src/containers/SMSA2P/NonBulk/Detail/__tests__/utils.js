import { getNonBulkStepper, getNonBulkWorklog } from '../utils';

describe('src/pages/SMSA2P/NonBulk/Detail', () => {
  it('getNonBulkStepper', () => {
    expect(getNonBulkStepper('On Progress')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getNonBulkStepper('Completed')).toEqual({
      active: 3,
      errors: undefined,
    });
    expect(getNonBulkStepper('rejected')).toEqual({
      active: 0,
      errors: 'rejected',
    });
  });

  it('getNonBulkWorklog', () => {
    expect(
      getNonBulkWorklog([
        {
          step: 1,
          status: 'test',
          dateTime: '2022-09-06T16:12:46+07:00',
          createdBy: '',
        },
        {
          step: 1,
          status: 'On Progress',
          note: 'Request Non Bulk activation',
          dateTime: '2022-09-06T16:12:46+07:00',
          createdBy: '',
        },
        {
          step: 2,
          status: 'Completed',
          note: 'Non Bulk activation order completed',
          noteProgress: 'test',
          dateTime: '2023-01-18T08:35:30.063Z',
          createdBy: 'DENA HARDIANTO',
        },
      ]),
    ).toBeTruthy();
  });
});
