import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Product from '../Product';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  feature: [],
  onClose: jest.fn(),
  variant: 'qualify',
};

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUp/elements/Product/index', () => {
  test('render properly', () => {
    useAction.mockReturnValueOnce({
      control: {},
      onSubmit: jest.fn(),
      handleSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Product {...props} />);
    tree.props.children[1].props.children.props.children[1].props.children.props.render(
      {
        field: { onChange: jest.fn(), value: undefined },
        fieldState: { error: { message: '-' } },
      },
    );
    expect(tree).toMatchSnapshot();
  });
});
