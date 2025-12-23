import { ACTIONS } from '@constants';
import reducer from '../reducer';

const initialState = {
  bakesData: {},
};

const expected = {
  bakesData: {
    customerApproval: [
      { name: 'x', email: 'x', position: 'x', phoneNumber: 'x' },
    ],
    hjm: '',
    price: '',
    telkomApproval: [
      { name: 'x', email: 'x', position: 'x', phoneNumber: 'x' },
    ],
    telkomPic: {
      name: null,
    },
    valueAgreement: '',
  },
};

describe('src/pages/GeneralProduct/BakesCreate/reducer', () => {
  test('initial state default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('state list listquotation', () => {
    const { BAKES_CREATE_DATA } = ACTIONS;
    const tree = reducer(initialState, {
      type: BAKES_CREATE_DATA,
      data: {
        telkomApproval: expected.bakesData.telkomApproval,
        customerApproval: expected.bakesData.customerApproval,
      },
    });
    expect(tree).toEqual({ bakesData: expected.bakesData });
  });

  test('state list listquotation 2', () => {
    const { BAKES_CREATE_DATA } = ACTIONS;
    const tree = reducer(initialState, {
      type: BAKES_CREATE_DATA,
      data: {
        telkomApproval: expected.bakesData.telkomApproval,
        customerApproval: expected.bakesData.customerApproval,
        telkomPic: { name: 'x' },
      },
    });
    expect(tree).toEqual({
      bakesData: {
        ...expected.bakesData,
        telkomPic: {
          name: {
            value: 'x',
            label: 'x',
            data: { name: 'x' },
          },
        },
      },
    });
  });
});
