import { ACTIONS } from '@constants';
import { normalizeRupiah } from '@utils/text';

const initialState = {
  bakesData: {},
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { BAKES_CREATE_DATA } = ACTIONS;
  switch (type) {
    case BAKES_CREATE_DATA:
      return {
        ...state,
        bakesData: {
          ...data,
          valueAgreement: normalizeRupiah(data?.valueAgreement),
          hjm: normalizeRupiah(data?.hjm),
          price: normalizeRupiah(data?.price),
          telkomApproval: data?.telkomApproval.map(
            ({ name, email, position, phoneNumber }) => ({
              name,
              email,
              position,
              phoneNumber,
            }),
          ),
          customerApproval: data?.customerApproval.map(
            ({ name, email, position, phoneNumber }) => ({
              name,
              email,
              position,
              phoneNumber,
            }),
          ),
          telkomPic: {
            ...data?.telkomPic,
            name: data?.telkomPic
              ? {
                  value: data?.telkomPic?.name,
                  label: data?.telkomPic?.name,
                  data: data?.telkomPic,
                }
              : null,
          },
        },
      };
    default:
      return state;
  }
}
