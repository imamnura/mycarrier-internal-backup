import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MessageInfo from '../MessageInfo';

describe('src/containers/SMSA2P/NonBulk/Detail/lib/MessageInfo', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <MessageInfo
        data={{
          status: 'CUSTOMER REQUEST',
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render other conditions', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <MessageInfo
        data={{
          status: 'INTEGRATED',
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
