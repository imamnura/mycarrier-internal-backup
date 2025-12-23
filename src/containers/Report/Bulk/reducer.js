import { ACTIONS } from '@constants';

const initialState = {
  graphSender: {
    data: [],
    params: {},
  },
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { GRAPH_SENDER_ID } = ACTIONS;
  switch (type) {
    case GRAPH_SENDER_ID:
      return {
        ...state,
        graphSender: data,
      };
    default:
      return state;
  }
}
