import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SteppersVertical from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/SteppersVertical', () => {
  const props = {
    classes: {},
    schemaStatus: jest.fn(),
  };

  test('render', () => {
    const customProps = {
      ...props,
      status: 'status',
      steps: [{ title: 'title', date: 'date', caption: 'caption' }],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SteppersVertical {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render StepIconComponent', () => {
    const customProps = {
      ...props,
      status: 'completed',
      steps: [{ title: 'title', date: 'date' }],
    };
    const property = {
      icon: 1,
    };
    const tree = shallow(<SteppersVertical {...customProps} />);
    tree.children().childAt(0).props().StepIconComponent(property);
    expect(tree).toMatchSnapshot();
  });
});
