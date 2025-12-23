import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DrawerItem from '../component';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('src/components/elements/DrawerItem', () => {
  const props = {
    classes: {},
    icon: 'icon',
    label: 'label',
    path: '#',
  };

  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
    useEffect.mockImplementation((func) => func());
  });

  test('render', () => {
    const customProps = {
      ...props,
      collapse: false,
    };
    jest.useFakeTimers();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DrawerItem {...customProps} />);
    jest.advanceTimersByTime(100);
    expect(tree).toMatchSnapshot();
    jest.useRealTimers();
  });

  test('render if active is true', () => {
    const customProps = {
      ...props,
      active: true,
      collapse: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DrawerItem {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
