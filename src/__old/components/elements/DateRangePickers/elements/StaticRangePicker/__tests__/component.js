import React, { useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StaticRangePicker from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('src/components/elements/DateRangePickers/elements/StaticRangePicker', () => {
  const props = {
    classes: {
      suggestItem: 'suggestItem',
    },
    onChange: jest.fn(),
  };

  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StaticRangePicker {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no value', () => {
    const customProps = {
      ...props,
      value: null,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StaticRangePicker {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('onClick', () => {
    const tree = shallow(<StaticRangePicker {...props} />);
    tree
      .find({ className: 'suggestItem' })
      .map((node) => node.props().onClick());
    expect(setState).toHaveBeenCalled();
  });
});
