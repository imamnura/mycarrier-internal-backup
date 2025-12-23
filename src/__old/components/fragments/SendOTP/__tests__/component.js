import React, { useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SendOTP from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

const mockEnqueue = jest.fn();

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('src/components/fragments/SendOTP', () => {
  const props = {
    classes: {},
    actions: {},
    endpoint: {},
    id: 'id',
    isSendLoading: false,
    keyId: '',
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    otpCounter: {
      id: 'id',
    },
  };

  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation((state) => [state, setState]);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SendOTP {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading send', () => {
    const customProps = {
      ...props,
      isSendLoading: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SendOTP {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('set otp', () => {
    const event = { target: { value: 'value' } };
    const tree = shallow(<SendOTP {...props} />);
    tree.childAt(2).childAt(0).props().input.onChange(event);
    expect(setState).toHaveBeenCalledWith('value');
  });
});
