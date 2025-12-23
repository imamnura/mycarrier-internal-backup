import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProductTree from '../ProductTree';
import { route } from '@configs';
import { useRouter } from 'next/router';
import { cleanup } from '@testing-library/react-hooks';

jest.mock('next/router');

describe('src/containers/ContentManagement/Product/Detail/Elements/ProductTree', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({
      asPath: route.productManage('detail'),
      push: jest.fn(),
      query: { id: '1' },
    });
  });

  const props = {
    data: {
      isDisplay: true,
      specialCase: {
        isSpecialCase: true,
      },
      type: 'single',
      level: 'l0',
      name: 'test',
    },
    onDelete: jest.fn(),
    handleOpenSubDetail: jest.fn(),
    onChangeDisplay: jest.fn(),
    onAddPage: jest.fn(),
    handleSpecialPage: jest.fn(),
    initialAction: {
      toggle: true,
      special: true,
      edit: true,
      remove: true,
    },
    initialData: {},
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductTree {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.children.props.children[0].props.onClick();
    tree.props.children[0].props.children.props.children[1].props.children[0].props.children.props.onChange(); //toggle
  });

  test('render isSingleProduct', () => {
    const customProps = {
      ...props,
      data: {
        isDisplay: true,
        specialCase: {
          isSpecialCase: true,
        },
        type: 'not single',
        level: 'l1',
        name: 'test',
        child: [
          {
            name: 'Product category level 1',
            slug: 'product-category-level-1',
            level: '1',
            isSingleProduct: true,
            catId: 'test',
            isDisplay: true,
            isSpecialCase: false,
            parentId: 'test',
            child: [
              {
                title: 'test',
                detailProduct: [
                  {
                    isSpecialCase: true,
                  },
                ],
                catId: 'test',
                isDisplay: true,
                isSpecialCase: false,
                name: 'test',
              },
            ],
          },
        ],
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductTree {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.children.props.children[0].props.onClick();
    tree.props.children[1].props.children[3].props.onClick();
    tree.props.children[1].props.children[1][0].props.children[0].props.children.props.children[1].props.children[2].props.onClick(); //special
    tree.props.children[1].props.children[1][0].props.children[0].props.children.props.children[1].props.children[3].props.onClick(); //edit
    tree.props.children[1].props.children[1][0].props.children[0].props.children.props.children[1].props.children[4].props.onClick(); //remove
  });

  test('render isSingleProduct isSpecialCase false', () => {
    const customProps = {
      ...props,
      data: {
        isDisplay: false,
        specialCase: {
          isSpecialCase: false,
        },
        type: 'not single',
        level: 'l1',
        name: 'test',
        child: [
          {
            name: 'Product category level 1',
            slug: 'product-category-level-1',
            level: '1',
            isSingleProduct: true,
            catId: 'test',
            isDisplay: true,
            isSpecialCase: false,
            parentId: 'test',
            child: [
              {
                title: 'test',
                detailProduct: [
                  {
                    isSpecialCase: true,
                  },
                ],
                catId: 'test',
                isDisplay: true,
                isSpecialCase: false,
                name: 'test',
              },
            ],
          },
        ],
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProductTree {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.children.props.children[0].props.onClick();
    tree.props.children[1].props.children[3].props.onClick();
    tree.props.children[1].props.children[1][0].props.children[0].props.children.props.children[1].props.children[2].props.onClick(); //special
    tree.props.children[1].props.children[1][0].props.children[0].props.children.props.children[1].props.children[3].props.onClick(); //edit
    tree.props.children[1].props.children[1][0].props.children[0].props.children.props.children[1].props.children[4].props.onClick(); //remove
  });
});
