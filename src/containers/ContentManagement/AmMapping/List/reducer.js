import { ACTIONS } from '@constants';

export const initialState = {
  amProfile: { data: [], detail: [] },
  listAmMappingCustomer: [],
  listAmMappingProfile: [],
  listCustomer: {
    data: [],
    meta: {},
  },
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const {
    LIST_AM_MAPPING_CUSTOMER,
    LIST_AM_MAPPING_PROFILE,
    AM_PROFILE,
    AM_LIST_CUSTOMER,
  } = ACTIONS;

  switch (type) {
    case AM_PROFILE:
      return {
        ...state,
        amProfile: data,
      };
    case AM_LIST_CUSTOMER:
      return {
        ...state,
        listCustomer: data,
      };
    case LIST_AM_MAPPING_CUSTOMER:
      return {
        ...state,
        listAmMappingCustomer: data,
      };
    case LIST_AM_MAPPING_PROFILE:
      return {
        ...state,
        listAmMappingProfile: data,
      };
    default:
      return state;
  }
}
