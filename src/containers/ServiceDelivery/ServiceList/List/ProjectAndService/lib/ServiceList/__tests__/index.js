import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ServiceList from '../ServiceList';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceDelivery/ServiceList/List/ProjectAndService/lib/ServiceList', () => {
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
      summary: false,
    },
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
    search: '',
    setSearch: jest.fn(),
    useOrderBy: ['', jest.fn()],
    useOrderDirection: ['', jest.fn()],
    filter: {
      product: {
        onChange: jest.fn(),
        options: [{ value: '', label: 'label' }],
        value: '',
      },
      regional: {
        onChange: jest.fn(),
        options: [{ value: '', label: 'label' }],
        value: '',
      },
      status: {
        onChange: jest.fn(),
        options: [{ value: '', label: 'label' }],
        value: '',
      },
    },
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ServiceList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
