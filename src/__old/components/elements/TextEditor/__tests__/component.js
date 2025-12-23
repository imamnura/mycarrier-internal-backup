import React, { useState, useEffect } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TextEditor from '../component';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/components/elements/TextEditor', () => {
  const props = {
    classes: {},
    input: {
      value: 'value',
      onChange: jest.fn(),
    },
    story: '',
    getStory: jest.fn(),
  };

  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
    useEffect.mockImplementation((func) => func());
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextEditor {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render evalute', () => {
    const customProps = {
      ...props,
      getStory: jest.fn(),
      type: 'evaluate',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextEditor {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render explore', () => {
    const customProps = {
      ...props,
      getStory: jest.fn(),
      type: 'explore',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextEditor {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
