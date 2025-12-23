import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RadioGroup from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('src/components/elements/RadioGroup', () => {
  const props = {
    classes: {},
    input: {
      onChange: jest.fn(),
      value: 'value',
    },
    options: [{ value: 'value1', label: 'label' }],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RadioGroup {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with custom field', () => {
    const customProps = {
      classes: {},
      input: {
        onChange: jest.fn(),
        value: 'value',
      },
      options: [{ value: 'value', label: 'label', withCustomField: true }],
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RadioGroup {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render when error', () => {
    const customProps = {
      classes: {},
      isGrey: true,
      input: {
        onChange: jest.fn(),
        value: 'value',
      },
      options: [{ value: 'value', label: 'label', withCustomField: true }],
      meta: {
        invalid: true,
        pristine: false,
      },
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RadioGroup {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('handle normal change', () => {
    const customProps = {
      ...props,
      options: [{ value: 'value1', label: 'label', withCustomField: true }],
    };
    const event = { target: { value: 'value' } };

    const tree = shallow(<RadioGroup {...customProps} />);
    tree.childAt(1).props().onChange();
    tree
      .childAt(1)
      .children()
      .props()
      .label.props.children[2].props.input.onChange(event);
    expect(props.input.onChange).toHaveBeenCalled();
  });
});
