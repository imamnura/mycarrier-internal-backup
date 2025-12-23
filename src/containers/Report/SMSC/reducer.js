import { ACTIONS } from '@constants';

const initialState = {
  graphSMSC: {
    data: [],
    params: {},
  },
  listCustomerSMSC: [],
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { GRAPH_SMSC, LIST_CUSTOMER_SMSC } = ACTIONS;
  switch (type) {
    case GRAPH_SMSC:
      return {
        ...state,
        graphSMSC: data,
      };
    case LIST_CUSTOMER_SMSC:
      return {
        ...state,
        listCustomerSMSC: data,
      };
    default:
      return state;
  }
}
