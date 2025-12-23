import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Dialog from '../component';

describe('src/components/elements/Dialog', () => {
  const props = {
    children: undefined,
    classes: {},
    className: '',
    customWidth: '',
    disableClose: false,
    maxWidth: 'sm',
    onClose: jest.fn(),
    open: false,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Dialog {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render custom width', () => {
    const customProps = {
      ...props,
      maxWidth: '',
      customWidth: 'css-custom',
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Dialog {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
