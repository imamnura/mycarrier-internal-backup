import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PickSalesTeam from '../PickSalesTeam';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  onClose: jest.fn(),
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/FormValidate/elements/PickSalesTeam', () => {
  test('render', () => {
    useAction.mockReturnValueOnce({
      control: {},
      onSubmit: jest.fn(),
      onPrevious: jest.fn(),
      disabled: false,
      handleSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PickSalesTeam {...props} />);
    tree.props.children[2].props.children.props.render({
      field: { onChange: jest.fn(), value: undefined },
      fieldState: { error: { message: '-' } },
    });
    expect(tree).toMatchSnapshot();
  });
});
