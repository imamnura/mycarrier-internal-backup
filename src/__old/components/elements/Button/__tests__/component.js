import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Button from '../component';

describe('src/components/elements/Button', () => {
  const props = {
    variant: 'primary',
    children: 'label',
    classes: {},
    onClick: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render when loading', () => {
    const customProps = {
      ...props,
      isLoading: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Button {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
