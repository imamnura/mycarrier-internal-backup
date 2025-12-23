import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/Document/ModificationOrder/List', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    list: {
      data: [],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    tab: 'ongoing',
    filter: {},
    setTab: jest.fn(),
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
    onClickDocument: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with access feature', () => {
    const newProps = {
      feature: [
        'read_list_on_going_modification_order',
        'read_list_upgrade_complete_modification_order',
        'read_list_downgrade_complete_modification_order',
      ],
    };

    const newActionReturn = {
      ...useActionReturn,
      tab: '',
      list: {
        data: [
          {
            startDate: '2021-06-29T11:47:49.249Z',
            endDate: '2021-06-29T11:47:49.249Z',
            documents: [],
          },
        ],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...newProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with documents', () => {
    const newActionReturn = {
      ...useActionReturn,
      list: {
        data: [
          {
            documents: [{ fileName: 'test.pdf' }],
          },
        ],
      },
    };

    useAction.mockReturnValue(newActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
