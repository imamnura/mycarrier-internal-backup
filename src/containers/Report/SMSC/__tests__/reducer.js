import { ACTIONS } from '@constants';
import reducer from '../reducer';

const initialState = {
  graphSMSC: {
    data: [],
    params: {},
  },
  listCustomerSMSC: [],
};

describe('src/pages/SMSCReport/reducer', () => {
  test('initial state default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('state graphSMSC', () => {
    const { GRAPH_SMSC } = ACTIONS;
    const tree = reducer(initialState, {
      type: GRAPH_SMSC,
      data: { data: [], params: {} },
    });
    expect(tree).toEqual({ ...initialState });
  });

  test('state listCustomerSMSC', () => {
    const { LIST_CUSTOMER_SMSC } = ACTIONS;
    const tree = reducer(initialState, {
      type: LIST_CUSTOMER_SMSC,
      data: [],
    });
    expect(tree).toEqual({ ...initialState });
  });
});
