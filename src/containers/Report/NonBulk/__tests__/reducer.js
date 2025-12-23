import { ACTIONS } from '@constants';
import reducer from '../reducer';

const initialState = {
  graphLBA: { data: [], params: {} },
};

describe('src/pages/LBAReport/reducer', () => {
  test('initial state default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('state graphLBA', () => {
    const { GRAPH_LBA } = ACTIONS;
    const tree = reducer(initialState, {
      type: GRAPH_LBA,
      data: { data: [], params: {} },
    });
    expect(tree).toEqual({ ...initialState });
  });
});
