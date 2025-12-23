import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Create from '../Create';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  validBy: 'amMapping',
  control: {},
  isOthersProduct: false,
  // isOthersSource,
  isBusinessTypeOthers: false,
  isDescriptionTypeOthers: false,
  isOtherCustomer: false,
  loadingCompany: false,
  loadingProduct: false,
  loadingSource: false,
  onSubmit: jest.fn(),
  handleSubmit: jest.fn(),
  optionCompany: [],
  optionProduct: [],
  optionSource: [],
};

describe('src/containers/LeadManagementSystem/Dashboard/Create', () => {
  test('render', () => {
    useAction.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create feature={[]} />);
    // tree.props.children.props.children.props.children[6].props.children[0].props.children.props.children[1].props.render(
    //   {
    //     field: { onChange: jest.fn(), value: undefined },
    //     fieldState: { error: { message: '-' } },
    //   },
    // );
    // tree.props.children.props.children.props.children[12].props.children.props.children.props.options[0].label.props.children[1].props.children.props.render(
    //   {
    //     field: { onChange: jest.fn(), value: undefined },
    //     fieldState: { error: { message: '-' } },
    //   },
    // );
    expect(tree).toMatchSnapshot();
  });
});
