import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Button from '../Button';
import Add from '../../../assets/icon-v2/Add';

describe('src/components/Button', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    Button.defaultProps.onClick();
    const tree = shallow.render(<Button />);
    tree.props.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('render/loading', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Button loading />);
    tree.props.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('render/icon', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Button leftIcon={Add} rightIcon={Add} />);
    expect(tree).toMatchSnapshot();
  });
});
