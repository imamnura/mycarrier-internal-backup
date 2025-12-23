import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RundownItem from '../RundownItem';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

const props = {
  classes: {},
  onSubmit: jest.fn(),
  onDelete: jest.fn(),
  provided: {},
  data: {
    title: 'test',
    startTime: 'test',
    endTime: 'test',
  },
  tab: 'id',
  setValue: jest.fn(),
  endTimeRundown: 'test',
  minTime: 'test',
  baseDate: 'test',
};

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/Rundown/elements/RundownItem', () => {
  afterEach(() => {
    cleanup();
  });

  const setState = jest.fn();

  beforeAll(() => {
    useStyles.mockReturnValue({ classes: {} });
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RundownItem {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[2].props.children[0].props.children[0].props.onChange({
      startTime: 'new',
      endTime: 'new',
    }); //onSubmitTime

    tree.props.children[2].props.children[1].props.children[0].props.onBlur(); //onSubmitTitle
    tree.props.children[2].props.children[1].props.children[0].props.onChange({
      target: { value: 'test' },
    }); //setTitle
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RundownItem {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
