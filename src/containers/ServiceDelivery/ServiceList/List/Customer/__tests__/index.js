import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceDelivery/ProductList/List', () => {
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
    onBottomPage: jest.fn(),
    onClickRowTable: jest.fn(),
    filter: {
      company: {
        onChange: jest.fn(),
        options: {},
        value: '',
      },
    },
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

    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...newProps} />);
    expect(tree).toMatchSnapshot();
  });
});
