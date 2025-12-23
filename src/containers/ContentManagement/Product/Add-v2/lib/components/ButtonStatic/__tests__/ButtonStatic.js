import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Button from '../ButtonStatic';

describe('src/containers/ContentManagement/Product/Add-v2/lib/components/ButtonStatic', () => {
  const props = {
    children: 'test',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Button {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
