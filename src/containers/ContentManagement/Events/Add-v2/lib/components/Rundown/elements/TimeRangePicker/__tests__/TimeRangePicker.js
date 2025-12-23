import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TimeRangePicker from '../TimeRangePicker';
import { cleanup } from '@testing-library/react-hooks/server';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

const props = {
  onChange: jest.fn(),
  baseDate: 'test',
  value: {
    startTime: 'test',
    endTime: 'test',
  },
  tab: 'id',
  setValue: jest.fn(),
  minTime: 'test',
  type: 'add',
  initialOpen: false,
  initialStartTime: 'test',
  initialEndTime: 'test',
};

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/Rundown/elements/TimeRangePicker', () => {
  afterEach(() => {
    cleanup();
  });

  const setState = jest.fn();

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TimeRangePicker {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.children.props.onClick(); //setOpen
  });

  test('render minTime now', () => {
    const customProps = {
      ...props,
      minTime: '',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TimeRangePicker {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children[2].props.children.props.children[0].props.children.props.onClick(); //onCancel

    tree.props.children[1].props.children[2].props.children.props.children[1].props.children.props.onClick(); //onSubmit
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TimeRangePicker {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
