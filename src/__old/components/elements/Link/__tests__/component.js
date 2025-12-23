import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Link from '../component';

describe('src/components/elements/Link', () => {
  const props = {
    children: 'Link',
    classes: {},
    to: '',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Link {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
