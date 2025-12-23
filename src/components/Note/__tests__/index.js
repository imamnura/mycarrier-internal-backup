import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Note from '../Note';

describe('src/components/Note', () => {
  const props = {
    variant: 'success',
    message: 'test',
    children: '--',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Note {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
