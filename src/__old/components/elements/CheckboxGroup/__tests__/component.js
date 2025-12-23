import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CheckboxGroup from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/CheckboxGroup', () => {
  const props = {
    input: {
      value: ['value'],
      onChange: jest.fn(),
    },
    classes: {},
  };

  test('render', () => {
    const customProps = {
      ...props,
      options: [{ label: 'label', value: 'value' }],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CheckboxGroup {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('onChange if checked', () => {
    const customProps = {
      ...props,
      options: [{ label: 'label', value: 'value' }],
    };
    const tree = shallow(<CheckboxGroup {...customProps} />);
    const checkbox = tree.children();
    checkbox.prop('control').props.onChange();
    expect(props.input.onChange).toHaveBeenCalled();
  });

  test('onChange if not checked', () => {
    const customProps = {
      ...props,
      options: [{ label: 'label', value: 'option' }],
    };
    const tree = shallow(<CheckboxGroup {...customProps} />);
    const checkbox = tree.children();
    checkbox.prop('control').props.onChange();
    expect(props.input.onChange).toHaveBeenCalled();
  });

  test('handle change', () => {
    const customProps = {
      ...props,
      options: [
        {
          value: 'value1',
          label: 'label',
          withCustomField: true,
          setValue: jest.fn(),
        },
      ],
    };
    const event = { target: { value: 'value' } };

    const tree = shallow(<CheckboxGroup {...customProps} />);
    tree.children().props().label.props.children[2].props.input.onChange(event);
    tree.children().props().label.props.children[2].props.input.onBlur();
    expect(props.input.onChange).toHaveBeenCalled();
  });
});
