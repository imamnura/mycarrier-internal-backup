import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RemindingOption from '../RemindingOption';
import useStyles from '../styles';
import { cleanup } from '@testing-library/react-hooks/server';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

jest.mock('../styles');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

const props = {
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  open: false,
  _value: 'test',
};

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/Reminding Option', () => {
  afterEach(() => {
    cleanup();
  });

  const setState = jest.fn();

  beforeEach(() => {
    useEffect.mockImplementation((func) => func());
    useStyles.mockReturnValue({});
    useState.mockImplementation((init) => [init, setState]);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RemindingOption {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('clik next', () => {
    const tree = shallow(<RemindingOption {...props} />);
    tree.find('#btn-next').props().onClick();
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
