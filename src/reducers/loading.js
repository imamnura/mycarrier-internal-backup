import { ACTIONS } from '../constants';

const initialState = {
  isLoading: false,
  isLoadingSubmit: false,
  isLoadingLazy: false,
  isLoadingNotification: false,
  isLoadingTable: false,
};

export default function reducer(state = initialState, action) {
  const {
    DONE_LOADING,
    DONE_LOADING_LAZY,
    DONE_LOADING_SUBMIT,
    DONE_LOADING_NOTIFICATION,
    DONE_LOADING_TABLE,
    LOADING,
    LOADING_LAZY,
    LOADING_SUBMIT,
    LOADING_NOTIFICATION,
    LOADING_TABLE,
  } = ACTIONS;
  const { type } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DONE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case LOADING_SUBMIT:
      return {
        ...state,
        isLoadingSubmit: true,
      };
    case DONE_LOADING_SUBMIT:
      return {
        ...state,
        isLoadingSubmit: false,
      };
    case LOADING_LAZY:
      return {
        ...state,
        isLoadingLazy: true,
      };
    case DONE_LOADING_LAZY:
      return {
        ...state,
        isLoadingLazy: false,
      };
    case LOADING_NOTIFICATION:
      return {
        ...state,
        isLoadingNotification: true,
      };
    case DONE_LOADING_NOTIFICATION:
      return {
        ...state,
        isLoadingNotification: false,
      };
    case LOADING_TABLE:
      return {
        ...state,
        isLoadingTable: true,
      };
    case DONE_LOADING_TABLE:
      return {
        ...state,
        isLoadingTable: false,
      };
    default:
      return state;
  }
}
