import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Divider from '../component';

describe('src/components/elements/Divider', () => {
  const props = {
    classes: {},
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Divider {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
