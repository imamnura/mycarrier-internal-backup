import { ACTIONS } from '../constants';

const initialState = {
  data: {},
};

export default function reducer(state = initialState, action) {
  const { POPUP_ALERT } = ACTIONS;
  const { type, data } = action;

  switch (type) {
    case POPUP_ALERT:
      return {
        ...state,
        data,
      };
    default:
      return state;
  }
}
