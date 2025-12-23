import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../index';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/ServiceAssurance/SMSA2P/List/index', () => {
  const useActionReturn = {
    filter: {
      customer: {
        onChange: jest.fn(),
        options: {},
        value: '',
      },
      dateRange: {
        onChange: jest.fn(),
        value: '',
      },
      status: {
        onChange: jest.fn(),
        options: {},
        value: '',
      },
    },
    loading: {
      tableRoot: false,
      tableRow: false,
      download: false,
    },
    list: {
      data: [],
      meta: [],
    },
    search: '',
    sort: 'asc',
    orderBy: '',
    setTab: jest.fn(),
    onBottomPage: jest.fn(),
    onClickDownload: jest.fn(),
    onClickRefresh: jest.fn(),
    setSearch: jest.fn(),
    onClickRowTable: jest.fn(),
    setSort: jest.fn(),
    setOrderBy: jest.fn(),
  };

  test('render', () => {
    const props = {
      feature: [],
    };
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab active', () => {
    const props = {
      feature: [
        'read_active',
        'read_history',
        'read_downloadActive',
        'read_downloadHistory',
        'read_detail',
        'read_detailHistory',
      ],
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      list: {
        data: [
          {
            status: 'checking',
          },
          {
            status: 'onprogress',
          },
          {
            status: 'customerreview',
          },
          {
            status: 'completed',
          },
          {
            status: 'rejected',
          },
        ],
        meta: {},
      },
      tab: 'active',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab done', () => {
    const props = {
      feature: [
        'read_active',
        'read_history',
        'read_downloadActive',
        'read_downloadHistory',
        'read_detail',
        'read_detailHistory',
      ],
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      list: {
        data: [],
        meta: {},
      },
      tab: 'done',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no tab', () => {
    const props = {
      feature: [
        'read_active',
        'read_history',
        'read_downloadActive',
        'read_downloadHistory',
        'read_detail',
        'read_detailHistory',
      ],
    };
    useAction.mockReturnValue({
      ...useActionReturn,
      list: {
        data: [],
        meta: {},
      },
      tab: '',
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
