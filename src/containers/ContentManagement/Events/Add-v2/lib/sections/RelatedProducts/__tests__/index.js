import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RelatedProducts from '../RelatedProducts';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/Events/Add-v2/lib/sections/RelatedProducts/index', () => {
  const props = {
    previewMode: false,
    loadingProduct: false,
    useForm: {
      _formState: { errors: { relatedProduct: { message: 'error' } } },
    },
    display: {
      isDisplayRelatedProduct: false,
      setIsDisplayRelatedProduct: jest.fn(),
    },
    tab: 'id',
  };

  const useActionReturn = {
    formState: {},
    control: {},
    fields: [{ name: 'test' }, { name: 'test 2' }],
    remove: jest.fn(),
    options: [],
    handleAddProduct: jest.fn(),
  };

  test('render default', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RelatedProducts {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.onChange();
    tree.props.children[1].props.children[1].props.children.props.children[0].props.children.props.children[1].props.onClick();
  });

  test('render isDisplayRelatedProduct false', () => {
    const customProps = {
      ...props,
      display: {
        isDisplayRelatedProduct: true,
        setIsDisplayRelatedProduct: jest.fn(),
      },
    };
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RelatedProducts {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
