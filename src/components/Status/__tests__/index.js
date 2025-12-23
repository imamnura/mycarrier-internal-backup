import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Status from '../Status';

describe('src/components/Status', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Status />);
    expect(tree).toMatchSnapshot();
  });
});
