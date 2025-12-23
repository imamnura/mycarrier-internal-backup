import { ACTIONS } from '@constants';

const initialState = {
  search: '',
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { SEARCH_QUERY } = ACTIONS;

  switch (type) {
    case SEARCH_QUERY:
      return {
        ...state,
        search: data,
      };
    default:
      return state;
  }
}
