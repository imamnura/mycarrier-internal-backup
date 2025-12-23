import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Notification from '../Notification';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const actions = {
  list: {
    data: [],
    meta: {},
    hasMore: false,
  },
  loading: {
    root: true,
    row: false,
  },
  onScrollContainer: jest.fn(),
  onRead: jest.fn(),
};

const baseData = {
  data: {},
  date: '',
  isRead: false,
  message: '',
};

describe('src/layouts/Main/elements/Header/components/Notification', () => {
  beforeEach(() => {
    useActions.mockImplementation(() => actions);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Notification />);
    tree.props.children[0].props.onClick({ currentTarget: <span /> });
    expect(tree).toMatchSnapshot();
  });

  test('render/loading', () => {
    useActions.mockImplementation(() => ({
      ...actions,
      loading: {
        root: false,
        row: true,
      },
      list: {
        data: [],
        meta: { unclickNotif: true },
      },
    }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Notification />);
    expect(tree).toMatchSnapshot();
  });

  test('render/with data', () => {
    useActions.mockImplementation(() => ({
      ...actions,
      loading: {
        root: false,
        row: false,
      },
      list: {
        data: [
          {
            notificationId: '1',
            type: 'ticket-assurance-internal',
          },
          {
            ...baseData,
            notificationId: '2',
            type: 'link-internal',
          },
          {
            ...baseData,
            notificationId: '3',
            type: 'lba-internal',
          },
          {
            ...baseData,
            notificationId: '4',
            type: 'sender-id-internal',
          },
          {
            ...baseData,
            notificationId: '5',
            type: 'purchase-order',
          },
          {
            ...baseData,
            notificationId: '6',
            type: 'activation-letter-internal',
          },
          {
            ...baseData,
            data: { status: 'BA COMPLETE' },
            notificationId: '7',
            type: 'activation-letter-internal',
          },
          {
            ...baseData,
            notificationId: '8',
            type: 'approval-user',
          },
          {
            ...baseData,
            notificationId: '8',
            type: 'others',
          },
        ],
        meta: {},
      },
    }));
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Notification />);
    tree.props.children[1].props.children[1].props.children[1].props.children[0].props.onClick();
    expect(tree).toMatchSnapshot();
  });
});
