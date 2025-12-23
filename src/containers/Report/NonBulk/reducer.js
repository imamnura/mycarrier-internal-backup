import { ACTIONS } from '@constants';

const initialState = {
  graphLBA: {
    data: [],
    params: {},
  },
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { GRAPH_LBA } = ACTIONS;
  switch (type) {
    case GRAPH_LBA:
      return {
        ...state,
        graphLBA: data,
      };
    default:
      return state;
  }
}
