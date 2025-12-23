import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/SMSA2P/LBA/List', () => {
  const props = {
    feature: ['read_list_request', 'read_list_active'],
  };

  let useActionReturn = {
    filter: {
      status: {},
      customer: {},
      operator: {},
      dateRange: {},
    },
    list: {
      data: [],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    onClickRefresh: jest.fn(),
    onClickRowTable: jest.fn(),
    tab: 'progress',
    search: '',
    setSearch: jest.fn(),
    setTab: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with no privilege & no tab', () => {
    const newProps = {
      feature: [],
    };

    useActionReturn = {
      ...useActionReturn,
      tab: '',
    };

    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...newProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with tab done', () => {
    useActionReturn = {
      ...useActionReturn,
      tab: 'done',
    };
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
