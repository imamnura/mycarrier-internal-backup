import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Tabs from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/Tabs', () => {
  const props = {
    classes: {},
    tabData: ['tab 1', 'tab 2'],
    value: 0,
    onChange: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Tabs {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('handle change', () => {
    const event = { target: { value: 'value' } };
    const tree = shallow(<Tabs {...props} />);
    tree.childAt(0).childAt(0).props().onChange(event);
    expect(props.onChange).toHaveBeenCalled();
  });
});
