import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Checkbox from '../component';
import Checked from '../Icon/Checked';
import Indeterminate from '../Icon/Indeterminate';
import Unchecked from '../Icon/Unchecked';

describe('src/components/elements/Checkbox', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Checkbox />);
    expect(tree).toMatchSnapshot();
  });

  test('icon/checked', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Checked />);
    expect(tree).toMatchSnapshot();
  });

  test('icon/unchecked', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Unchecked />);
    expect(tree).toMatchSnapshot();
  });

  test('icon/inderminate', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Indeterminate />);
    expect(tree).toMatchSnapshot();
  });
});
