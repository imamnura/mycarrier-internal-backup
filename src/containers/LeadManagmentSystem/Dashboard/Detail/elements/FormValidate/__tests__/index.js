import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FormValidate from '../FormValidate';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  show: true,
  onClose: jest.fn(),
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/FormValidate', () => {
  test('render step 0', () => {
    useAction.mockReturnValueOnce({
      activeStep: 0,
      formProps: {
        setActiveStep: jest.fn().mockReturnValue(jest.fn()),
        control: {},
        handleSubmit: jest.fn(),
        onSubmit: jest.fn(),
        isOtherCustomer: false,
        formState: {},
        onClose: jest.fn(),
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormValidate {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render step 1', () => {
    useAction.mockReturnValueOnce({
      activeStep: 1,
      formProps: {
        setActiveStep: jest.fn().mockReturnValue(jest.fn()),
        control: {},
        handleSubmit: jest.fn(),
        onSubmit: jest.fn(),
        isOtherCustomer: false,
        formState: {},
        onClose: jest.fn(),
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormValidate {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render step 2 case sales team', () => {
    useAction.mockReturnValueOnce({
      activeStep: '2SalesTeam',
      formProps: {
        setActiveStep: jest.fn().mockReturnValue(jest.fn()),
        control: {},
        handleSubmit: jest.fn(),
        onSubmit: jest.fn(),
        isOtherCustomer: false,
        formState: {},
        onClose: jest.fn(),
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormValidate {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render step 2 case other recepient', () => {
    useAction.mockReturnValueOnce({
      activeStep: '2OtherRecepient',
      formProps: {
        setActiveStep: jest.fn().mockReturnValue(jest.fn()),
        control: {},
        handleSubmit: jest.fn(),
        onSubmit: jest.fn(),
        isOtherCustomer: false,
        formState: {},
        onClose: jest.fn(),
        isEdit: false,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FormValidate {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
