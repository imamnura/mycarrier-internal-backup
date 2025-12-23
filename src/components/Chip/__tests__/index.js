import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Chip from '../Chip';

describe('src/components/Chip', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Chip label="ChipLabel" />);
    expect(tree).toMatchSnapshot();
  });
});
