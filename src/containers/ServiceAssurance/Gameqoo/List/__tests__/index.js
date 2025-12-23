import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/Gameqoo/List', () => {
  const useActionReturn = {
    list: {
      data: [{ status: 'Checking' }, { status: 'tes' }],
      meta: [],
    },
    loading: {
      tableRoot: false,
      tableRow: false,
      download: false,
    },
    onBottomPage: jest.fn(),
    filterStatus: { label: 'All Status', value: '' },
    filterDateRange: [null, null],
    setFilterStatus: jest.fn(),
    setFilterDateRange: jest.fn(),
    search: '',
    setSearch: jest.fn(),
    tab: '',
    setTab: jest.fn(),
    onClickRefresh: jest.fn(),
    onClickRowTable: jest.fn(),
  };

  test('render', () => {
    const props = {
      feature: [
        'read_list_approval_ticket_gameqoo',
        'read_list_history_ticket_gameqoo',
      ],
    };
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no feature', () => {
    const props = {
      feature: [],
    };
    useActions.mockReturnValue({ ...useActionReturn, tab: '' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no feature with tab', () => {
    const props = {
      feature: [],
    };
    useActions.mockReturnValue({ ...useActionReturn, tab: 'approval' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render filter tab approval', () => {
    const props = {
      feature: [
        'read_list_approval_ticket_gameqoo',
        'read_list_history_ticket_gameqoo',
      ],
    };
    useActions.mockReturnValue({ ...useActionReturn, tab: 'approval' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render filter tab history', () => {
    const props = {
      feature: [
        'read_list_approval_ticket_gameqoo',
        'read_list_history_ticket_gameqoo',
      ],
    };
    useActions.mockReturnValue({ ...useActionReturn, tab: 'history' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
