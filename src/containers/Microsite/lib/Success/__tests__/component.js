import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { configure, shallow } from 'enzyme';
import Component from '../component';
import Button from '../../../../../__old/components/elements/Button';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/pages/Microsite/lib/Success', () => {
  const props = {
    classes: {},
    label: 'label',
    url: 'url',
    image: 'image',
    buttonLabel: 'buttonLabel',
    noButton: false,
  };

  const setState = jest.fn();

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('function test', () => {
    const tree = shallow(<Component {...props} />);
    // console.log(tree.find(Button).props());
    tree.find(Button).props().onClick();
  });
});
