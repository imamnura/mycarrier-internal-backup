import reducer, { initialState } from '../reducer';
import { ACTIONS } from '../../../../../constants';

const { INTERESTED_LIST_DETAIL } = ACTIONS;

describe('src/pages/ContentManagement/InterestedList/List/reducer', () => {
  it('test initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('state interestedListDetail toEqual initialState', () => {
    const tree = reducer(initialState, {
      type: INTERESTED_LIST_DETAIL,
      data: {},
    });
    expect(tree).toEqual({ ...initialState });
  });
});
