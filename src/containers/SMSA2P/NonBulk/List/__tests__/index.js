import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/NonBulk/List', () => {
  const props = {
    feature: ['read_list_non_bulk_request', 'read_list_non_bulk_active'],
  };

  let useActionReturn = {
    filter: {
      customer: {},
      campaignType: {},
      dateRange: {},
    },
    list: {
      data: [
        {
          status: 'On Progress',
        },
        {
          status: 'Completed',
        },
        {
          status: 'Test',
        },
      ],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    onClickRefresh: jest.fn(),
    onClickRowTable: jest.fn(),
    tab: 'On Progress',
    setTab: jest.fn(),
    search: '',
    setSearch: jest.fn(),
    orderBy: '',
    setOrderBy: jest.fn(),
    sort: 'asc',
    setSort: jest.fn(),
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
      tab: 'Completed',
    };
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
