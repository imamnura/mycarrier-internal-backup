import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Switch, { CustomSwitch } from '../Switch';

describe('src/components/Switch', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Switch onChange={jest.fn()} value={false} />);
    tree.props.onChange({ target: { checked: true } });
    expect(tree).toMatchSnapshot();
  });

  test('custom switch', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CustomSwitch />);
    expect(tree).toMatchSnapshot();
  });
});
