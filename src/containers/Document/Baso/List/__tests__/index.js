import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const props = {
  feature: ['read_list_request', 'read_detail'],
};

const actions = {
  filterStatus: [{ label: 'All Status', value: '' }],
  filterAm: [{ label: 'All Account Manager', value: '' }],
  filterSegment: [{ label: 'All Segment', value: '' }],
  filterCustomer: [{ label: 'All Customer', value: '' }],
  filterProduct: [{ label: 'All Product', value: '' }],
  filterOrderType: [{ label: 'All Order Type', value: '' }],
  list: {
    data: [
      {
        activationDoc: {
          fileurl: 'https://test',
          fileName: 'test.pdf',
        },
        account_manager: {
          fullName: 'test',
          segment: 'test',
        },
      },
    ],
    meta: {},
    hasMore: false,
  },
  loading: {
    tableRoot: true,
    tableRow: false,
  },
  onBottomPage: jest.fn(),
  onClickDocument: jest.fn(),
  onClickRowTable: jest.fn(),
  setFilterStatus: jest.fn(),
};

describe('src/pages/Document/Baso', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with empty data', () => {
    useActions.mockReturnValue({
      ...actions,
      feature: [],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
