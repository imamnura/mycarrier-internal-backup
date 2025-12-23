import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Form from '../index';
// import { create, act } from 'react-test-renderer';

describe('src/containers/ServiceAssurance/GeneralProduct/List/lib/RejectForm/index', () => {
  test('render', () => {
    const props = {
      allowed: ['.pdf'],
      control: {},
      file: { name: '' },
      formState: {
        isDirty: false,
        isValid: true,
      },
      handleUploadFile: jest.fn(),
      setFile: jest.fn(),
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...props} />);
    Form.defaultProps.handleSubmit();
    Form.defaultProps.handleUploadFile();
    Form.defaultProps.onClose();
    Form.defaultProps.onSubmit();
    Form.defaultProps.setFile();
    expect(tree).toMatchSnapshot();
  });

  test('render with no file', () => {
    const props = {
      allowed: ['.pdf'],
      control: {},
      file: null,
      formState: {},
      handleUploadFile: jest.fn(),
      setFile: jest.fn(),
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
