import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Steppers from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/Steppers', () => {
  const props = {
    classes: {},
    steps: [{ label: 'label' }],
  };

  test('render', () => {
    const customProps = {
      ...props,
      activeStep: 1,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Steppers {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with StepIconComponent', () => {
    const customProps = {
      ...props,
      activeStep: 0,
    };

    const propertyActive = {
      active: true,
      label: 'Returned',
    };

    const tree = shallow(<Steppers {...customProps} />);
    tree.children().children().props().StepIconComponent({});
    tree.children().children().props().StepIconComponent(propertyActive);
    expect(tree).toMatchSnapshot();
  });
});
