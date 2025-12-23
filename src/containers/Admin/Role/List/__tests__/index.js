import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/Admin/Role/List/index', () => {
  const useActionReturn = {
    filter: {
      userType: {
        onChange: jest.fn(),
        options: [
          { label: 'All User Type', value: '' },
          { label: 'Customer', value: 'customer' },
          { label: 'Internal', value: 'internal' },
        ],
        value: { label: 'All User Type', value: '' },
      },
    },
    list: {
      data: [],
      meta: [],
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    onBottomPage: jest.fn(),
    onClickAdd: jest.fn(),
    onClickRowTable: jest.fn(),
    orderBy: '',
    search: '',
    setOrderBy: jest.fn(),
    setSearch: jest.fn(),
    setSort: jest.fn(),
    sort: 'asc',
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });
});
