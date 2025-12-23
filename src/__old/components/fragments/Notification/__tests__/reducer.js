import reducer from '../reducer';
import { ACTIONS } from '../../../../../constants';

const initialState = {
  listNotification: {
    data: [],
    meta: {},
  },
};

describe('src/components/fragments/Notification/reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  test('initial data notification', () => {
    const { NOTIFICATION } = ACTIONS;
    const tree = reducer(initialState, {
      type: NOTIFICATION,
      data: 'test',
      listNotification: {
        data: [],
        meta: {},
      },
    });
    expect(tree).toMatchSnapshot();
  });
});
