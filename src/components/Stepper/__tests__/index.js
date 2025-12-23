import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Stepper, { NumberingStep } from '../Stepper';

describe('src/components/Stepper', () => {
  const props = {
    active: 0,
    steps: ['1', '2', { label: '3', dateTime: '22/22/2222' }],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Stepper {...props} />);
    tree.props.children.props.children[0].props.children.props.StepIconComponent();
    expect(tree).toMatchSnapshot();
  });

  test('render/reject', () => {
    const customProps = {
      ...props,
      errors: 'rejected',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Stepper {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/return', () => {
    const customProps = {
      ...props,
      errors: 'returned',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Stepper {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/drop quote', () => {
    const customProps = {
      ...props,
      errors: 'rejected',
      errorsLabel: 'Drop Quote',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Stepper {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/other errors', () => {
    const customProps = {
      ...props,
      errors: 'others',
      variant: 'number',
      onStepClick: jest.fn(),
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Stepper {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/warnings', () => {
    const customProps = {
      ...props,
      warnings: 'Delay Opportunity',
      active: 2,
      accessibleTab: 1,
      onStepClick: jest.fn(),
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Stepper {...customProps} />);
    tree.props.children.props.children[1].props.children.props.children.props.children[0].props.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('render/other warnings', () => {
    const customProps = {
      ...props,
      warnings: 'warn',
      active: 2,
      accessibleTab: 1,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Stepper {...customProps} />);
    tree.props.children.props.children[1].props.children.props.children.props.children[0].props.onClick();
    expect(tree).toMatchSnapshot();
  });

  test('numbering step', () => {
    const Comp = NumberingStep({ number: 1, variant: 'default' });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Comp />);
    expect(tree).toMatchSnapshot();
  });
});
