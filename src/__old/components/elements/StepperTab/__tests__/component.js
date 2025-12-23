import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StepperTab from '../component';

describe('src/components/elements/StepperTab', () => {
  const props = {
    classes: {},
    items: [{ label: 'label' }, { label: 'label2' }],
  };

  test('render', () => {
    const customProps = {
      ...props,
      active: 0,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperTab {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render when complete', () => {
    const customProps = {
      ...props,
      active: 1,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StepperTab {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
