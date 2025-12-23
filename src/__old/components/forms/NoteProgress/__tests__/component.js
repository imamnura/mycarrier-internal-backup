import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NoteProgress from '../component';

describe('src/components/forms/NoteProgress', () => {
  const props = {
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NoteProgress {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
