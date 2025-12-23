import Account from '@assets/icon-v2/Account';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OptionList from '../OptionList';

describe('src/components/OptionList', () => {
  test('render', () => {
    const props = {
      options: [{ value: '1', label: '1', Icon: Account, description: 'test' }],
      onChange: jest.fn(),
      value: '1',
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<OptionList {...props} />);
    tree.props.children[0].props.onClick();
    expect(tree).toMatchSnapshot();
  });
});
