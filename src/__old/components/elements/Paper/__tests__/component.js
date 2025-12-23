import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Paper from '../component';

describe('src/components/elements/Paper', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Paper />);
    expect(tree).toMatchSnapshot();
  });
});
