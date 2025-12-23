import reducer, { initialState } from '../reducer';
import { ACTIONS } from '../../../../../constants';

describe('src/pages/Admin/Privilege/List/reducer', () => {
  it('test the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('state details toEqual initialState', () => {
    const { DETAIL_PRIVILEGES } = ACTIONS;
    const tree = reducer(initialState, {
      type: DETAIL_PRIVILEGES,
      data: {},
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state edit toEqual initialState', () => {
    const { EDIT_PRIVILEGES } = ACTIONS;
    const tree = reducer(initialState, {
      type: EDIT_PRIVILEGES,
      data: {},
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state isFuncName toEqual initialState', () => {
    const { VALID_FUNCTION_PRIVILEGES } = ACTIONS;
    const tree = reducer(initialState, {
      type: VALID_FUNCTION_PRIVILEGES,
      data: false,
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state isFuncAlias toEqual initialState', () => {
    const { VALID_FUNCTION_ALIAS_PRIVILEGES } = ACTIONS;
    const tree = reducer(initialState, {
      type: VALID_FUNCTION_ALIAS_PRIVILEGES,
      data: false,
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state isFuncDesc toEqual initialState', () => {
    const { VALID_DESCRIPTION_PRIVILEGES } = ACTIONS;
    const tree = reducer(initialState, {
      type: VALID_DESCRIPTION_PRIVILEGES,
      data: false,
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state isCatTitle toEqual initialState', () => {
    const { VALID_CATEGORY_PRIVILEGES } = ACTIONS;
    const tree = reducer(initialState, {
      type: VALID_CATEGORY_PRIVILEGES,
      data: false,
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state isFeatName toEqual initialState', () => {
    const { VALID_FEATURE_PRIVILEGES } = ACTIONS;
    const tree = reducer(initialState, {
      type: VALID_FEATURE_PRIVILEGES,
      data: false,
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state isEmpty toEqual initialState', () => {
    const { VALID_ISEMPTY_PRIVILEGES } = ACTIONS;
    const tree = reducer(initialState, {
      type: VALID_ISEMPTY_PRIVILEGES,
      data: false,
    });
    expect(tree).toEqual({ ...initialState });
  });

  it('state isPrivilegeUsed toEqual initialState', () => {
    const { VALID_ISPRIVILEGES_USED } = ACTIONS;
    const tree = reducer(initialState, {
      type: VALID_ISPRIVILEGES_USED,
      data: false,
    });
    expect(tree).toEqual({ ...initialState });
  });
});
