import { getBakesStatus, getBakesStepper, getBakesWorklog } from '../utils';

describe('src/pages/Document/Bakes/Detail', () => {
  it('getBakesStatus', () => {
    expect(getBakesStatus('approved')).toEqual({
      children: 'approved',
      variant: 'success',
    });
    expect(getBakesStatus('others')).toEqual({
      children: 'others',
      variant: '',
    });
  });

  it('getBakesStepper', () => {
    expect(getBakesStepper({ status: 'customer approval' })).toEqual({
      active: 2,
      errors: undefined,
      steps: ['Submitted', 'Telkom Approved', 'Customer Approval', 'Approved'],
    });
    expect(getBakesStepper({ status: 'approved' })).toEqual({
      active: 3,
      errors: undefined,
      steps: ['Submitted', 'Telkom Approved', 'Customer Approved', 'Approved'],
    });
    expect(
      getBakesStepper({
        status: 'returned',
        worklog: [
          { status: 'customer approval' },
          { status: 'customer approval' },
          { status: 'customer approval' },
        ],
      }),
    ).toEqual({
      active: 2,
      errors: 'returned',
      steps: ['Submitted', 'Telkom Approved', 'Customer Approval', 'Approved'],
    });
  });

  it('getBakesWorklog', () => {
    expect(
      getBakesWorklog([
        {
          status: 'approved',
          dateTime: null,
          note: 'note',
          createdBy: 'customer approval',
        },
        {
          status: 'returned',
          dateTime: null,
          note: 'note',
          createdBy: 'telkom approval 2',
        },
        {
          status: 'rejected',
          dateTime: null,
          note: 'note',
          createdBy: 'customer approval 1',
        },
        { status: 'draft', dateTime: null, note: 'note', createdBy: '' },
        {
          status: 'telkom approval',
          dateTime: null,
          note: 'note',
          createdBy: '',
        },
        { status: 'others', dateTime: null, note: 'note', createdBy: '' },
      ]),
    ).toBeTruthy();
  });
});
