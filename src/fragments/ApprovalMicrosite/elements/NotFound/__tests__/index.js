import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NotFound from '../NotFound';

describe('src/fragments/NotFound/elements/NotFound', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NotFound />);
    expect(tree).toMatchSnapshot();
  });
});
