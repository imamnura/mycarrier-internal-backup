import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/SMSA2P/Keyword/List', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    filterStatus: { label: 'All Status', value: '' },
    list: {
      data: [{ activationStatus: 'rejected' }],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    tab: 'onprogress',
    filter: {},
    setTab: jest.fn(),
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with access feature', () => {
    const newProps = {
      feature: ['read_list_request', 'read_list_active'],
    };

    const newActionReturn = {
      ...useActionReturn,
      tab: '',
      list: {
        data: [{ activationStatus: 'checking' }],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...newProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with status onprogress', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [{ activationStatus: 'onprogress' }],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
