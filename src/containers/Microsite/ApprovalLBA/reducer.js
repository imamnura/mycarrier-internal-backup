import { ACTIONS } from '../../../constants';

const initialState = {
  detailApprovalLBA: {},
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { APPROVAL_LBA } = ACTIONS;
  switch (type) {
    case APPROVAL_LBA:
      return {
        ...state,
        detailApprovalLBA: data,
      };
    default:
      return state;
  }
}
