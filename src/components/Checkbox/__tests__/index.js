import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Checkbox from '../Checkbox';

describe('src/components/Checkbox', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Checkbox />);
    expect(tree).toMatchSnapshot();
  });
});
