import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Otp from '../Otp';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

describe('src/components-v2/elements/Form/Otp', () => {
  const props = {
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    title: 't',
    description: 'd',
  };

  test('render', () => {
    useAction.mockReturnValue({
      control: {},
      onSubmit: jest.fn(),
      loading: false,
      timer: 0,
      reSendOTP: jest.fn(),
      formState: { isValid: true, isDirty: false },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Otp {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    useAction.mockReturnValue({
      control: {},
      onSubmit: jest.fn(),
      loading: true,
      timer: 0,
      reSendOTP: jest.fn(),
      formState: { isValid: true, isDirty: false },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Otp {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render timer', () => {
    useAction.mockReturnValue({
      control: {},
      onSubmit: jest.fn(),
      loading: false,
      timer: 22,
      reSendOTP: jest.fn(),
      formState: { isValid: true, isDirty: false },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Otp {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
