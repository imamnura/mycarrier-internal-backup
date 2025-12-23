import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Typography from '../Typography';

describe('src/components/Typography', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Typography />);
    expect(tree).toMatchSnapshot();
  });
});
