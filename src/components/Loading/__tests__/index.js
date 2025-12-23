import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Loading from '../Loading';

describe('src/components/Loading', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Loading />);
    expect(tree).toMatchSnapshot();
  });
});
