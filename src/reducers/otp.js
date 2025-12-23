import { ACTIONS } from '../constants';

const initialState = {
  otpCounter: {},
};

export default function reducer(state = initialState, action) {
  const { OTP_COUNTER } = ACTIONS;
  const { data, type } = action;

  switch (type) {
    case OTP_COUNTER:
      return {
        ...state,
        otpCounter: {
          ...state.otpCounter,
          ...data,
        },
      };
    default:
      return state;
  }
}
