import {
  generateWorklogNote,
  getOfferingLetterStatus,
  getOfferingLetterStepper,
} from '../utils';

describe('src/pages/Document/OfferingLetter/Detail', () => {
  it('getOfferingLetterStatus', () => {
    expect(getOfferingLetterStatus('completed')).toEqual({
      children: 'completed',
      variant: 'success',
    });
    expect(getOfferingLetterStatus('others')).toEqual({
      children: 'others',
      variant: '',
    });
  });

  it('getOfferingLetterStepper', () => {
    expect(getOfferingLetterStepper('draft')).toEqual({
      active: 0,
      errors: undefined,
    });
    expect(getOfferingLetterStepper('signing on progress')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getOfferingLetterStepper('signing failed')).toEqual({
      active: 1,
      errors: 'rejected',
      errorsLabel: 'Signing Failed',
    });
    expect(getOfferingLetterStepper('completed')).toEqual({
      active: 3,
      errors: undefined,
    });
  });

  it('getOfferingLetterStepper 2', () => {
    expect(
      getOfferingLetterStepper([
        { status: 'approved', dateTime: null, note: 'note' },
        { status: 'returned', dateTime: null, note: 'note' },
        { status: 'rejected', dateTime: null, note: 'note' },
        { status: 'draft', dateTime: null, note: 'note' },
        { status: 'telkom approval', dateTime: null, note: 'note' },
        { status: 'others', dateTime: null, note: 'note' },
      ]),
    ).toBeTruthy();
  });

  it('generateWorklogNote', () => {
    expect(
      generateWorklogNote({ note: 'tes', noteProgress: 'tes' }),
    ).toBeTruthy();
  });
});
