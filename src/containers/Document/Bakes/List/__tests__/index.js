import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/Document/Bakes/List', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    feature: [],
    filterCompany: { label: 'All Company', value: '' },
    filterCompanyOptions: [],
    filterPeriod: [null, null],
    filterStatus: { label: 'All Status', value: '' },
    list: {
      data: [],
      meta: [],
    },
    loading: {
      tableRoot: false,
      tableRow: false,
      filterCompany: false,
    },
    manager: false,
    onBottomPage: jest.fn(),
    onClickNewBakes: jest.fn(),
    onClickRowTable: jest.fn(),
    setFilterCompany: jest.fn(),
    setFilterPeriod: jest.fn(),
    setFilterStatus: jest.fn(),
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
            startDate: '2021-10-07T05:13:42.986Z',
            endDate: '2021-10-07T05:13:42.986Z',
          },
          {},
        ],
        meta: {},
      },
      manager: true,
      feature: ['create_bakes'],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
