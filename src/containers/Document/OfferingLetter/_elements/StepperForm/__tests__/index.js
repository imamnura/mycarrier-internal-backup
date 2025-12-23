import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StepperForm from '../StepperForm';

const props = {
  active: 2,
  data: {
    companyName: '',
    products: '',
    toc: '',
    agreement: '',
  },
  onStepperClick: jest.fn(),
};

describe('src/containers/Document/OfferingLetter/_elements/StepperForm/index', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
  test('render agreement', () => {
    const customProps = {
      ...props,
      data: {
        companyName: '',
        products: '',
        toc: '',
        agreement: 'test',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render toc', () => {
    const customProps = {
      ...props,
      data: {
        companyName: '',
        products: '',
        toc: { usage: { period: 'test' } },
        agreement: '',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render products', () => {
    const customProps = {
      ...props,
      data: {
        companyName: '',
        products: 'test',
        toc: '',
        agreement: '',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render companyName', () => {
    const customProps = {
      ...props,
      data: {
        companyName: 'test',
        products: '',
        toc: '',
        agreement: '',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
