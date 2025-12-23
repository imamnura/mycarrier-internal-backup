import { ACTIONS } from '../../../../constants';

export const initialState = {
  detailServiceAssuranceNeucloud: {},
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { DETAIL_SERVICE_ASSURANCE_NEUCLOUD } = ACTIONS;
  switch (type) {
    case DETAIL_SERVICE_ASSURANCE_NEUCLOUD:
      return {
        ...state,
        detailServiceAssuranceNeucloud: data,
      };
    default:
      return state;
  }
}
