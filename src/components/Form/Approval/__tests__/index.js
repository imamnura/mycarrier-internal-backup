import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Approval from '../Approval';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

describe('src/components-v2/elements/Form/Approval', () => {
  const props = {
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    title: 't',
    description: 'd',
  };

  test('render', () => {
    useAction.mockReturnValue({
      control: {},
      onSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Approval {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
