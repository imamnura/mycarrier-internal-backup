import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/Neucentrix/VisitNeucentrix/List', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    filterStatus: { label: 'All Status', value: '' },
    list: {
      data: [],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    search: '',
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
    setFilterStatus: jest.fn(),
    setSearch: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render case 2', () => {
    useAction.mockReturnValue({
      ...useActionReturn,
      list: {
        data: [
          {
            visitStartDate: '2021-10-07T05:13:42.986Z',
            visitEndDate: '2021-10-07T05:13:42.986Z',
            customerType: 'customer type',
            status: 'completed',
          },
          {},
        ],
        meta: {},
      },
    });

    const props = {
      feature: ['read_list_visiting_neucentrix_am'],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
