import { ACTIONS } from '../../../../constants';

const initialState = {
  listNotification: {
    data: [],
    meta: {},
  },
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { NOTIFICATION } = ACTIONS;
  switch (type) {
    case NOTIFICATION:
      return {
        ...state,
        listNotification: data,
      };
    default:
      return state;
  }
}
