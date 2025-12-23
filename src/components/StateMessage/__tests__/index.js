import UserManagement from '@assets/icon-v2/UserManagement';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StateMessage from '../StateMessage';

describe('src/components/StateMessage', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <StateMessage
        description="dsc"
        ilustration={UserManagement}
        message="msg"
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
