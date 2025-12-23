import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DiscountForm from '../DiscountForm';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionsReturn = {
  control: {},
  formState: {
    isValid: false,
  },
  optionsBakesNumber: [],
  step: 1,
  setStep: jest.fn(),
  watch: jest.fn(),
  handleSubmit: jest.fn(),
  handleUpdateStatus: jest.fn(),
};

const props = {
  content: {
    bakesNumber: '123',
  },
};

describe('src/containers/Document/PurchaseOrder/Detail-v2/lib/form/Discount', () => {
  test('render properly', () => {
    useActions.mockReturnValue(useActionsReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DiscountForm {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render properly other states', () => {
    useActions.mockReturnValue({
      ...useActionsReturn,
      formState: {
        isValid: true,
      },
      step: 0,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DiscountForm />);
    expect(tree).toMatchSnapshot();

    const grid = tree.props.children.props.children.props.children;

    //stepper onstepclick
    grid[2].props.children.props.onStepClick();
    //button step 0 onclick
    grid[5].props.children.props.children[1].props.children.props.onClick();
  });
});
