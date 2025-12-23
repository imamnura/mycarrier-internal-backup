import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RadioItem from '../RadioItem';
import { cleanup } from '@testing-library/react-hooks/server';

const actions = {
  key: 0,
  label: 'test',
  value: {
    symptompName: 'test',
    symptompId: 'test',
    symptompDesc: 'test',
    symptompPath: 'test',
    value: 'test',
  },
  handleValue: () => jest.fn(),
};

describe('src/containers/ServiceAssurance/Gameqoo/Validation/lib/SelectWithLevel/lib/RadioItem', () => {
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RadioItem {...actions} />);
    expect(tree).toMatchSnapshot();
    tree.props.control.props.onClick();
  });
});
