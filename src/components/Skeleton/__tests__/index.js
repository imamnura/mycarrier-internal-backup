import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Skeleton from '../Skeleton';

describe('src/components/Skeleton', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Skeleton />);
    expect(tree).toMatchSnapshot();
  });
});
