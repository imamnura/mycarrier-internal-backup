import { ACTIONS } from '@constants';

export const initialState = {
  listProduct: [],
  listSource: [],
  listAM: [],
  listSegment: [],
  graphInterestedStatus: {
    data: [],
    params: {},
  },
  graphInterestedProduct: {
    data: [],
    params: {},
  },
  graphInterestedAM: {
    data: [],
    meta: {},
  },
  graphInterestedSegment: {
    data: [],
    meta: {},
  },
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const {
    INTERESTED_GRAPH_AM,
    INTERESTED_GRAPH_PRODUCT,
    INTERESTED_GRAPH_SEGMENT,
    INTERESTED_GRAPH_STATUS,
    LIST_SOURCE,
    LIST_PRODUCT,
    LIST_AM_VALID,
    LIST_SEGMENT_VALID,
  } = ACTIONS;

  switch (type) {
    case INTERESTED_GRAPH_STATUS:
      return {
        ...state,
        graphInterestedStatus: data,
      };
    case INTERESTED_GRAPH_PRODUCT:
      return {
        ...state,
        graphInterestedProduct: data,
      };
    case INTERESTED_GRAPH_AM:
      return {
        ...state,
        graphInterestedAM: data,
      };
    case INTERESTED_GRAPH_SEGMENT:
      return {
        ...state,
        graphInterestedSegment: data,
      };
    case LIST_PRODUCT:
      return { ...state, listProduct: data };
    case LIST_SOURCE:
      return { ...state, listSource: data };
    case LIST_AM_VALID:
      return { ...state, listAM: data };
    case LIST_SEGMENT_VALID:
      return { ...state, listSegment: data };
    default:
      return state;
  }
}
