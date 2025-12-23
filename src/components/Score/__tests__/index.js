import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Score from '../Score';

describe('src/components/Score', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Score />);
    expect(tree).toMatchSnapshot();
  });
});
