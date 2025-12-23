import React from 'react';
import preloadAll from 'jest-next-dynamic';
import ShallowRenderer from 'react-test-renderer/shallow';
import Wysiwyg from '../Wysiwyg';

describe('src/components/Wysiwyg', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    preloadAll();
    jest.runAllTimers();
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Wysiwyg helperText="-" onChange={jest.fn()} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
