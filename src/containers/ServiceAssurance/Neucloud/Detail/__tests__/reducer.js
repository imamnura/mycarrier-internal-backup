import reducer, { initialState } from '../reducer';
import { ACTIONS } from '../../../../../constants';

describe('src/containers/ServiceAssurance/Neucloud/Detail/reducer', () => {
  it('test the initial state default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('state detailServiceAssuranceNeucloud toEqual initialState', () => {
    const { DETAIL_SERVICE_ASSURANCE_NEUCLOUD } = ACTIONS;
    const tree = reducer(initialState, {
      type: DETAIL_SERVICE_ASSURANCE_NEUCLOUD,
      data: {},
    });
    expect(tree).toEqual({ ...initialState });
  });
});
