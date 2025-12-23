import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Primary from '../Primary';

describe('src/components-v2/Select/elements/Primary', () => {
  const props = {
    value: '',
    options: [{ value: 'value' }],
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    required: true,
    label: 'label',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Primary {...props} />);
    tree.props.children[2].props.onChange({ value: 'test' });
    tree.props.children[2].props.onBlur({});
    tree.props.children[2].props.onFocus({});
    expect(tree).toMatchSnapshot();
  });

  test('render/other', () => {
    const customProps = {
      ...props,
      onBlur: undefined,
      onFocus: undefined,
      isMulti: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Primary {...customProps} />);
    tree.props.children[2].props.onChange({ value: 'test' });
    tree.props.children[2].props.onBlur({});
    tree.props.children[2].props.onFocus({});
    expect(tree).toMatchSnapshot();
  });
});
