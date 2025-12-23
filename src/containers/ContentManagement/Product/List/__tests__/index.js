import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';
import useStyles from '../hooks/useStyles';
import theme from '@styles/theme';
import { cleanup } from '@testing-library/react-hooks/server';

jest.mock('../hooks/useActions');
jest.mock('../hooks/useStyles');

describe('src/containers/ContentManagement/Product/List/index', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    useStyles.mockReturnValue({ classes: {} });
  });

  const props = {
    feature: [''],
  };

  const useActionReturn = {
    feature: [''],
    list: {
      data: [
        {
          catId: 'a9642e7',
          id: 229,
          isDisplay: true,
          isSpecialCase: {},
          level: '0',
          name: 'Cloud & Data Center',
          parentId: null,
          status: 'publish',
          type: 'full',
        },
        {
          catId: 'a9642e7a-31b1-4120-85ff-9e0b1',
          id: 229,
          isDisplay: true,
          isSpecialCase: {},
          level: '0',
          name: 'Cloud & Data Center',
          parentId: null,
          status: 'publish',
          type: 'full',
        },
      ],
      meta: {},
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    search: '',
    confirmation: { content: '', actions: [] },
    sort: 'newest',
    orderBy: '',
    onAddProduct: jest.fn(),
    onBottomPage: jest.fn(),
    onDeleteProduct: jest.fn(),
    onUpdateProduct: jest.fn(),
    clearConfirmation: jest.fn(),
    setSearch: jest.fn(),
    setConfirmation: jest.fn(),
    setSort: jest.fn(),
    setOrderBy: jest.fn(),
    classes: { actionContainer: {} },
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.table.data[0].operations.props.children[1].props.onClick(
      11,
    ); //updateProduct
    tree.props.children.props.table.data[0].operations.props.children[2].props.onClick(
      11,
    ); //deleteProduct
  });

  test('render case 2', () => {
    const customProps = { feature: ['create_product'] };
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

  test('render style', () => {
    expect(useStyles(theme)).not.toBeNull();
  });
});
