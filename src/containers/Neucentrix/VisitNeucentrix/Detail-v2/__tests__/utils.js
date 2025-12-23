import {
  getVisitNCXStepper,
  getVisitNCXWorklog,
  privilege,
  pickAlertCopywriting,
} from '../utils';

const feature = [
  'update_reject_visiting_neucentrix_marketing',
  'update_reject_visiting_neucentrix_am',
  'update_reject_by_occ_visiting',
  'update_assign_to_am_visiting_neucentrix',
  'update_forward_to_sigma_witel_arnet_visiting_neucentrix',
  'update_forward_by_occ_visiting',
];

describe('src/pages/Neucentrix/VisitNeucentrix/Detail', () => {
  it('getVisitNCXStepper', () => {
    expect(getVisitNCXStepper('checking')).toEqual({
      active: 0,
      errors: undefined,
    });
    expect(getVisitNCXStepper('approved')).toEqual({
      active: 1,
      errors: undefined,
    });
    expect(getVisitNCXStepper('not visit')).toEqual({
      active: 2,
      errors: 'rejected',
      errorsLabel: 'Not Visit',
    });
    expect(getVisitNCXStepper('visiting')).toEqual({
      active: 2,
      errors: undefined,
    });
    expect(getVisitNCXStepper('completed')).toEqual({
      active: 4,
      errors: undefined,
    });
    expect(getVisitNCXStepper('rejected')).toEqual({
      active: 1,
      errors: 'rejected',
      errorsLabel: 'Rejected',
    });
  });

  it('privilege', () => {
    expect(privilege(feature)).toBeDefined();
  });

  it('pickAlertCopywriting', () => {
    expect(pickAlertCopywriting(['test'])).toBeDefined();
  });

  it('pickAlertCopywriting with 2 data', () => {
    expect(pickAlertCopywriting(['test', 'test2'])).toBeDefined();
  });

  it('pickAlertCopywriting with other data', () => {
    expect(pickAlertCopywriting(['test', 'test2', 'test3'])).toBeDefined();
  });

  it('getVisitNCXWorklog', () => {
    expect(
      getVisitNCXWorklog([
        {
          step: 0,
          status: 'checking',
          note: '',
          noteProgress: 'Visitor data is being verified',
        },
        {
          step: 1,
          status: 'forwarded',
          note: 'Forwarded visit request from Account Manager to Sigma, Witel, and Arnet',
          noteProgress: '',
        },
        {
          step: 2,
          status: 'witel approved',
        },
        {
          step: 2,
          status: 'network approved',
          note: 'network approved visit request',
          noteProgress: '',
        },
        {
          step: 2,
          status: 'sigma approved',
          note: 'sigma approved visit request',
          noteProgress: '',
        },
        {
          step: 6,
          note: 'Customer completed visiting NeuCentrIX',
          noteProgress: '',
        },
      ]),
    ).toBeTruthy();
  });
});
