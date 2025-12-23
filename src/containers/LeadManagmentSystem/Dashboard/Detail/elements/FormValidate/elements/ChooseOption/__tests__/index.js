import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ChooseOption from '../ChooseOption';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  onClose: jest.fn(),
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/FormValidate/elements/ChooseOption', () => {
  test('render', () => {
    useAction.mockReturnValueOnce({
      control: {},
      onSubmit: jest.fn(),
      handleSubmit: jest.fn(),
      onPrevious: jest.fn(),
      onClose: jest.fn(),
      option: [],
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ChooseOption {...props} />);
    tree.props.children[2].props.children.props.render({
      field: { onChange: jest.fn(), value: undefined },
      fieldState: { error: { message: '-' } },
    });
    expect(tree).toMatchSnapshot();
  });
});
