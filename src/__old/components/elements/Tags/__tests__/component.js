import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Tags from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/components/elements/Tags', () => {
  const props = {
    disabled: false,
    getValue: jest.fn(),
    initialValue: ['value1', 'value2'],
    options: [],
  };

  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
    useEffect.mockImplementation((func) => func());
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Tags {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render input & tags', () => {
    const event = { target: { value: [] } };
    const getTagProps = jest.fn();
    const tree = shallow(<Tags {...props} />);
    tree.children().props().getOptionLabel({});
    tree.children().props().onChange(event);
    tree.children().props().renderInput({});
    tree.children().props().renderTags(props.initialValue, getTagProps);
    expect(setState).toHaveBeenCalled();
  });
});
