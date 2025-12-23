import { ACTIONS } from '@constants';

export const initialState = {
  interestedListDetail: {},
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { INTERESTED_LIST_DETAIL } = ACTIONS;

  switch (type) {
    case INTERESTED_LIST_DETAIL:
      return {
        ...state,
        interestedListDetail: data,
      };
    default:
      return state;
  }
}
