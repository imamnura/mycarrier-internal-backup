import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UpdateActivity from '../UpdateActivity';
import useStyles from '../styles';
import { cleanup } from '@testing-library/react-hooks/server';

jest.mock('../styles');

const actions = {
  open: true,
  onClose: jest.fn(),
  control: {},
  optionStatus: [],
  optionActivity: [
    { label: 'test', check: true },
    { label: 'test2', check: false },
  ],
  setSelectedActivity: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmit: jest.fn(),
  disabled: false,
};

describe('src/containers/ServiceAssurance/GeneralProduct/Detail/lib/UpdateActivity', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    useStyles.mockReturnValue({ classes: {} });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UpdateActivity {...actions} />);
    expect(tree).toMatchSnapshot();
  });
});
