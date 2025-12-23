import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Auth from '../Auth';

describe('src/layouts/Auth', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Auth children={<span />} />);
    expect(tree).toMatchSnapshot();
  });
});
