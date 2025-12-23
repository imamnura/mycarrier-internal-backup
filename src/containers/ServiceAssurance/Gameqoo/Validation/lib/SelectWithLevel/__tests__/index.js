import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SelectWithLevel from '../SelectWithLevel';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');

const actions = {
  data: [],
  open: false,
  refField: {},
  setOpen: jest.fn(),
  onChange: jest.fn(),
  selected: {},
  value: '',
  handleValue: jest.fn(),
};

describe('src/containers/ServiceAssurance/Gameqoo/Validation/lib/SelectWithLevel', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    useStyles.mockReturnValue({ classes: {} });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SelectWithLevel {...actions} />);
    expect(tree).toMatchSnapshot();
  });

  test('render isLoading true', () => {
    const customActions = { ...actions, isLoading: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SelectWithLevel {...customActions} />);
    expect(tree).toMatchSnapshot();
  });

  test('render value true', () => {
    const customActions = { ...actions, value: 'test' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SelectWithLevel {...customActions} />);
    expect(tree).toMatchSnapshot();
  });
});
