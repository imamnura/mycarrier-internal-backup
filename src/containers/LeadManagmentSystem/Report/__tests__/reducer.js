import { ACTIONS } from '@constants';
import reducer from '../reducer';

const initialState = {
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

describe('src/container/ContentManagement/InterestedList/Report/reducer', () => {
  test('initial state default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('graphInterestedStatus', () => {
    const { INTERESTED_GRAPH_STATUS } = ACTIONS;
    const tree = reducer(initialState, {
      type: INTERESTED_GRAPH_STATUS,
      data: { data: [], params: {} },
    });
    expect(tree).toEqual({ ...initialState });
  });

  test('graphInterestedProduct', () => {
    const { INTERESTED_GRAPH_PRODUCT } = ACTIONS;
    const tree = reducer(initialState, {
      type: INTERESTED_GRAPH_PRODUCT,
      data: { data: [], params: {} },
    });
    expect(tree).toEqual({ ...initialState });
  });

  test('graphInterestedAM', () => {
    const { INTERESTED_GRAPH_AM } = ACTIONS;
    const tree = reducer(initialState, {
      type: INTERESTED_GRAPH_AM,
      data: { data: [], meta: {} },
    });
    expect(tree).toEqual({ ...initialState });
  });

  test('graphInterestedSegment', () => {
    const { INTERESTED_GRAPH_SEGMENT } = ACTIONS;
    const tree = reducer(initialState, {
      type: INTERESTED_GRAPH_SEGMENT,
      data: { data: [], meta: {} },
    });
    expect(tree).toEqual({ ...initialState });
  });

  test('listSource', () => {
    const { LIST_SOURCE } = ACTIONS;
    const tree = reducer(initialState, {
      type: LIST_SOURCE,
      data: [],
    });
    expect(tree).toEqual({ ...initialState });
  });

  test('listProduct', () => {
    const { LIST_PRODUCT } = ACTIONS;
    const tree = reducer(initialState, {
      type: LIST_PRODUCT,
      data: [],
    });
    expect(tree).toEqual({ ...initialState });
  });

  test('listValidAM', () => {
    const { LIST_AM_VALID } = ACTIONS;
    const tree = reducer(initialState, {
      type: LIST_AM_VALID,
      data: [],
    });
    expect(tree).toEqual({ ...initialState });
  });

  test('listValidSegment', () => {
    const { LIST_SEGMENT_VALID } = ACTIONS;
    const tree = reducer(initialState, {
      type: LIST_SEGMENT_VALID,
      data: [],
    });
    expect(tree).toEqual({ ...initialState });
  });
});
