import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Text from '../component';

describe('src/components/elements/Text', () => {
  const props = {
    children: 'Text',
    classes: {},
    variant: 'body2',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Text {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
