import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StepperForm from '../StepperForm';

const props = {
  active: 1,
  data: {
    invoices: null,
    fileTemplate: null,
    attachment: null,
    reviewer: null,
    carbonCopy: null,
  },
  onStepperClick: jest.fn(),
};

describe('src/containers/BillsAndPayment/BillsAndPaymentManagement/BillingReminder/Create/elements/StepperForm/index', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render reviewer', () => {
    const customProps = { ...props, data: { reviewer: [{}, {}] } };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render carbonCopy', () => {
    const customProps = {
      ...props,
      data: {
        reviewer: null,
        carbonCopy: ['test1', 'test2', 'test3', 'test4'],
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render fileTemplate', () => {
    const customProps = {
      ...props,
      data: { reviewer: null, fileTemplate: 'test' },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render attachment', () => {
    const customProps = {
      ...props,
      data: {
        reviewer: null,
        attachment: { data: { fileName: 'test', fileUrl: 'test' } },
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render invoices', () => {
    const customProps = {
      ...props,
      data: { reviewer: null, invoices: 'test' },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render data null', () => {
    const customProps = { ...props, data: null };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
