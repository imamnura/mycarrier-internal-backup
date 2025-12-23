import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ListOfDetail from '../ListOfDetail';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  filterLastUpdate: null,
  filterStatus: null,
  list: {
    data: [{}],
    meta: { page: 1, totalPage: 2 },
  },
  loading: false,
  onBottomPage: jest.fn(),
  search: '',
  setFilterLastUpdate: jest.fn(),
  setFilterStatus: jest.fn(),
  setSearch: jest.fn(),
};

describe('src/containers/Broadcast/BroadcastInformation/Detail/elements/ListOfDetail', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListOfDetail />);
    expect(tree).toMatchSnapshot();
  });
});
