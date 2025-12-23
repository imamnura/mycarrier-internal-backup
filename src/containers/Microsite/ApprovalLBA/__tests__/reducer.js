import { ACTIONS } from '../../../../constants';
import reducer from '../reducer';

const initialState = {
  detailApprovalLBA: {},
};

describe('src/pages/Microsite/ApprovalLBA/reducer', () => {
  test('initial state default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('detail invoice', () => {
    const { APPROVAL_LBA } = ACTIONS;
    const tree = reducer(initialState, {
      type: APPROVAL_LBA,
      data: {},
    });
    expect(tree).toEqual({ ...initialState });
  });
});
