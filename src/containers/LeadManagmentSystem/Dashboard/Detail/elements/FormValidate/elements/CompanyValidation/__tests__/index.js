import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CompanyValidation from '../CompanyValidation';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  onClose: jest.fn(),
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/FormValidate/elements/CompanyValidation', () => {
  test('render', () => {
    useAction.mockReturnValueOnce({
      loading: false,
      optionCompany: [],
      control: {},
      isOtherCustomer: false,
      onSubmit: jest.fn(),
      handleSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CompanyValidation {...props} />);
    tree.props.children[2].props.children.props.children[1].props.render({
      field: { onChange: jest.fn(), value: undefined },
      fieldState: { error: { message: '-' } },
    });
    expect(tree).toMatchSnapshot();
  });

  test('render isOtherCustomer', () => {
    useAction.mockReturnValueOnce({
      loading: false,
      optionCompany: [],
      control: {},
      isOtherCustomer: true,
      onSubmit: jest.fn(),
      handleSubmit: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CompanyValidation {...props} />);
    tree.props.children[2].props.children.props.children[1].props.render({
      field: { onChange: jest.fn(), value: undefined },
      fieldState: { error: { message: '-' } },
    });
    expect(tree).toMatchSnapshot();
  });
});
