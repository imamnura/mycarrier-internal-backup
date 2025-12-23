import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';
// import useStyles from '../hooks/useStyles';
// import { theme } from '@styles/theme';

jest.mock('../hooks/useActions');
jest.mock('../hooks/useStyles');

describe('src/containers/ContentManagement/Article/List/index', () => {
  const props = {
    feature: [''],
  };

  const useActionReturn = {
    feature: [''],
    list: {
      data: [
        {
          id: 1,
          imageUrl: 'https://600x400-1.png',
          isDisplay: true,
          title: 'MSIGHT: Telco Big Data Solution for Your Business',
        },
        {
          id: 2,
          imageUrl: 'https://600x400-1.png',
          isDisplay: true,
          title: 'MSIGHT: Telco Big Data Solution for Your Business',
        },
      ],
      meta: {},
      hasMore: false,
    },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    search: '',
    sort: 'newest',
    orderBy: '',
    onAddArticle: jest.fn(),
    onBottomPage: jest.fn(),
    onDeleteArticle: jest.fn(),
    onUpdateArticle: jest.fn(),
    setSearch: jest.fn(),
    setConfirmation: jest.fn(),
    setSort: jest.fn(),
    setOrderBy: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.table.data[0].operations.props.children[1].props.onClick();
    // tree.props.children.props.table.data[0].operations.props.children[1].props.onClick();
  });

  test('render case 2', () => {
    const customProps = { feature: ['create_article'] };
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

  // test('render style', () => {
  //   expect(useStyles(theme)).not.toBeNull();
  // });
});
