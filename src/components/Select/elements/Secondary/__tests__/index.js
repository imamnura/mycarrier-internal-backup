import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Secondary from '../Secondary';

describe('src/components-v2/Select/elements/Secondary', () => {
  const props = {
    value: '',
    options: [{ value: 'value' }],
    onChange: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    required: true,
    label: 'label',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Secondary {...props} />);
    tree.props.children[1].props.children[0].props.onChange({ value: 'test' });
    tree.props.children[1].props.children[0].props.onBlur({});
    tree.props.children[1].props.children[0].props.onFocus({});
    expect(tree).toMatchSnapshot();
  });

  test('render/others', () => {
    const customProps = {
      ...props,
      onBlur: null,
      onFocus: null,
      rawValue: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Secondary {...customProps} />);
    tree.props.children[1].props.children[0].props.onChange({ value: 'test' });
    tree.props.children[1].props.children[0].props.onBlur({});
    tree.props.children[1].props.children[0].props.onFocus({});
    expect(tree).toMatchSnapshot();
  });
});
