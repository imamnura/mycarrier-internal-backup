import { ACTIONS } from '../../../../constants';

export const initialState = {
  details: {},
  edit: {},
  isFuncName: false,
  isFuncAlias: false,
  isFuncDesc: false,
  isCatTitle: false,
  isFeatName: false,
  isEmpty: false,
  isPrivilegeUsed: false,
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const {
    DETAIL_PRIVILEGES,
    VALID_FUNCTION_PRIVILEGES,
    VALID_FUNCTION_ALIAS_PRIVILEGES,
    VALID_DESCRIPTION_PRIVILEGES,
    VALID_CATEGORY_PRIVILEGES,
    VALID_FEATURE_PRIVILEGES,
    VALID_ISEMPTY_PRIVILEGES,
    VALID_ISPRIVILEGES_USED,
    EDIT_PRIVILEGES,
  } = ACTIONS;

  switch (type) {
    case DETAIL_PRIVILEGES:
      return { ...state, details: data };
    case EDIT_PRIVILEGES:
      return { ...state, edit: data };
    case VALID_FUNCTION_PRIVILEGES:
      return { ...state, isFuncName: data };
    case VALID_FUNCTION_ALIAS_PRIVILEGES:
      return { ...state, isFuncAlias: data };
    case VALID_DESCRIPTION_PRIVILEGES:
      return { ...state, isFuncDesc: data };
    case VALID_CATEGORY_PRIVILEGES:
      return { ...state, isCatTitle: data };
    case VALID_FEATURE_PRIVILEGES:
      return { ...state, isFeatName: data };
    case VALID_ISEMPTY_PRIVILEGES:
      return { ...state, isEmpty: data };
    case VALID_ISPRIVILEGES_USED:
      return { ...state, isPrivilegeUsed: data };
    default:
      return state;
  }
}
