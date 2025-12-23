import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/Document/PurchaseOrder/List', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    feature: [],
    filterCustomer: { label: 'All Company', value: '' },
    filterCustomerOptions: [],
    filterOrderType: { label: 'All Company', value: '' },
    filterProduct: { label: 'All Company', value: '' },
    filterProductOptions: [],
    filterStatus: { label: 'All Company', value: '' },
    list: {
      data: [],
      meta: {},
    },
    loading: {
      filterCustomer: false,
      filterProduct: false,
      tableRoot: false,
      tableRow: false,
    },
    onBottomPage: jest.fn(),
    onClickDocument: jest.fn(),
    onClickRowTable: jest.fn(),
    search: '',
    setFilterCustomer: jest.fn(),
    setFilterOrderType: jest.fn(),
    setFilterProduct: jest.fn(),
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
            documentPO: [
              {
                fileUrl: 'asd.pdf',
                fileName: 'asd',
              },
            ],
          },
          {},
        ],
        meta: {},
      },
      feature: [],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
