import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProjectList from '../ProjectList';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceDelivery/ServiceList/List/ProjectAndService/lib/ProjectList', () => {
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
    search: '',
    setSearch: jest.fn(),
    useOrderBy: ['', jest.fn()],
    useOrderDirection: ['', jest.fn()],
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProjectList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
