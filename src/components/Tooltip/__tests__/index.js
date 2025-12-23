import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Tooltip from '../Tooltip';

describe('src/components/Tooltip', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Tooltip title="aaa">
        <span>asdsd</span>
      </Tooltip>,
    );
    expect(tree).toMatchSnapshot();
  });
});
