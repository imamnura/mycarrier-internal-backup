import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CallbackAlert from '../component';

describe('src/components/elements/CallbackAlert', () => {
  const props = {
    classes: {},
    onClose: jest.fn(),
  };

  test('render when loading', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CallbackAlert {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render failed state', () => {
    const customProps = {
      ...props,
      content: 'label',
      subContent: 'label',
      isLoading: false,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CallbackAlert {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render success state', () => {
    const customProps = {
      ...props,
      content: 'label',
      subContent: 'label',
      withHtml: true,
      isLoading: false,
      success: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CallbackAlert {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render info state', () => {
    const customProps = {
      ...props,
      content: 'label',
      subContent: 'label',
      withHtml: true,
      isLoading: false,
      info: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CallbackAlert {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
