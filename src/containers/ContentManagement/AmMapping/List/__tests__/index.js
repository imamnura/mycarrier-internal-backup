import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/AmMapping/List/index', () => {
  const props = {
    feature: [],
  };

  const useActionReturn = {
    feature: [],
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
    onClickAdd: jest.fn(),
    onClickRowTable: jest.fn(),
    setSearch: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render case 2', () => {
    const customProps = { feature: ['create_amMapping'] };
    useActions.mockReturnValue({
      ...useActionReturn,
      list: {
        data: [],
        meta: {},
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
