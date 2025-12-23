import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WhatsNew from '../WhatsNew';

describe('src/fragments/WhatsNew', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<WhatsNew />);
    expect(tree).toMatchSnapshot();
  });
});
