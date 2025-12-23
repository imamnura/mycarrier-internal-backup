import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StatusInformation, { CardStatus } from '../StatusInformation';

describe('src/containers/Broadcast/BroadcastInformation/Detail/elements/StatusInformation', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StatusInformation />);
    expect(tree).toMatchSnapshot();
  });

  test('render/card status', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CardStatus />);
    expect(tree).toMatchSnapshot();
  });
});
