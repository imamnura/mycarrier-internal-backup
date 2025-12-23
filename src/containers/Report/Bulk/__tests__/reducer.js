import { ACTIONS } from '@constants';
import reducer from '../reducer';

const initialState = {
  graphSender: {
    data: [],
    params: {},
  },
};

describe('src/pages/SenderIDReport/reducer', () => {
  test('initial state default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('state graphSender', () => {
    const { GRAPH_SENDER_ID } = ACTIONS;
    const tree = reducer(initialState, {
      type: GRAPH_SENDER_ID,
      data: { data: [], params: {} },
    });
    expect(tree).toEqual({ ...initialState });
  });
});
