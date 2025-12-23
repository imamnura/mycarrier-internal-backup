import { ACTIONS } from '../constants';

const initialState = {
  listActivateCustomer: [],
  listGPCustomer: [],
  listOperatorType: [],
};

export default function reducer(state = initialState, action) {
  const { LIST_ACTIVATE_CUSTOMER, LIST_OPERATOR_TYPE, LIST_CUSTOMER_GP } =
    ACTIONS;
  const { data, type } = action;

  switch (type) {
    case LIST_ACTIVATE_CUSTOMER:
      return {
        ...state,
        listActivateCustomer: data,
      };
    case LIST_OPERATOR_TYPE:
      return {
        ...state,
        listOperatorType: data,
      };
    case LIST_CUSTOMER_GP:
      return {
        ...state,
        listGPCustomer: data,
      };
    default:
      return state;
  }
}
