import React, { useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DateRangePickers from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('src/components/elements/DateRangePickers', () => {
  const props = {
    classes: {},
    input: {
      value: [],
    },
    label: 'label',
    options: {},
  };

  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DateRangePickers {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('Popover open', () => {
    const tree = shallow(<DateRangePickers {...props} />);
    tree.childAt(0).childAt(1).props().onClick();
    expect(setState).toHaveBeenCalled();
  });

  test('Popover onClose', () => {
    const tree = shallow(<DateRangePickers {...props} />);
    tree.childAt(1).props().onClose();
    expect(setState).toHaveBeenCalled();
  });
});
