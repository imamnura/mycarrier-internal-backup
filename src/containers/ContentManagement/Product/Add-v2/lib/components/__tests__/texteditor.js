import React, { useEffect } from 'react';
import preloadAll from 'jest-next-dynamic';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../texteditor';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

describe('src/containers/ContentManagement/Product/Add-v2/lib/components/texteditor', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    preloadAll();
    jest.runAllTimers();
    useEffect.mockImplementation((func) => func());
  });

  const props = {
    getStory: jest.fn(),
    value: '',
    handleChange: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render value', () => {
    const customProps = { ...props, value: 'test' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.onModelChange('test 2');
  });
});
