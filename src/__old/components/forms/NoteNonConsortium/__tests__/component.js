import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NoteNonConsortium from '../component';

describe('src/components/forms/NoteNonConsortium', () => {
  const props = {
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NoteNonConsortium {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
