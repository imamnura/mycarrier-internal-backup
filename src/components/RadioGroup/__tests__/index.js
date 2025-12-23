import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RadioGroup from '../RadioGroup';

describe('src/components/RadioGroup', () => {
  const _props = {
    onChange: jest.fn(),
    alignItems: 'center',
    direction: 'vertical',
    disabled: false,
    error: false,
    helperText: 'helper',
    label: 'label',
    options: [
      { value: '0', label: 'nol' },
      { value: '1', label: 1 },
    ],
    required: true,
    value: null,
  };

  test('render', () => {
    const props = {
      ..._props,
      onBlur: jest.fn(),
      onFocus: jest.fn(),
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RadioGroup {...props} />);
    tree.props.children[2].props.onBlur();
    tree.props.children[2].props.onFocus();
    expect(tree).toMatchSnapshot();
  });

  test('render hideHelper', () => {
    const props = {
      ..._props,
      hideHelper: true,
      helperText: 'helper',
      onBlur: jest.fn(),
      onFocus: jest.fn(),
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RadioGroup {...props} />);
    tree.props.children[2].props.onBlur();
    tree.props.children[2].props.onFocus();
    expect(tree).toMatchSnapshot();
  });

  test('render/other', () => {
    const props = _props;
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RadioGroup {...props} />);
    tree.props.children[2].props.onBlur();
    tree.props.children[2].props.onFocus();
    expect(tree).toMatchSnapshot();
  });
});
