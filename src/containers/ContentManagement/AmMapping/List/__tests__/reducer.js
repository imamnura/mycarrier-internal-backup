import reducer, { initialState } from '../reducer';
import { ACTIONS } from '@constants';

describe('src/containers/ContentManagement/AmMapping/List/reducer', () => {
  it('test the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('state amProfile toEqual initialState', () => {
    const { AM_PROFILE } = ACTIONS;
    const tree = reducer(initialState, {
      type: AM_PROFILE,
      data: {
        data: [],
        detail: [],
      },
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state AMListCustomer toEqual initialState', () => {
    const { AM_LIST_CUSTOMER } = ACTIONS;
    const tree = reducer(initialState, {
      type: AM_LIST_CUSTOMER,
      data: {
        data: [],
        meta: {},
      },
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state listAmMappingCustomer toEqual initialState', () => {
    const { LIST_AM_MAPPING_CUSTOMER } = ACTIONS;
    const tree = reducer(initialState, {
      type: LIST_AM_MAPPING_CUSTOMER,
      data: [],
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state listAmMappingProfile toEqual initialState', () => {
    const { LIST_AM_MAPPING_PROFILE } = ACTIONS;
    const tree = reducer(initialState, {
      type: LIST_AM_MAPPING_PROFILE,
      data: [],
    });
    expect(tree).toEqual({ ...initialState });
  });
});
