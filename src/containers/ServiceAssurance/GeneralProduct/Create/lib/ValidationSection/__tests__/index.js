import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Form from '../index';

jest.mock('react-hook-form');

describe('src/containers/ServiceAssurance/GeneralProduct/Create/lib/ValidationSection', () => {
  test('render', () => {
    const props = {
      breadcrumb: [],
      status: {},
      submitValidation: jest.fn(),
      useform: {
        control: {},
        handleSubmit: jest.fn(),
        formState: {},
      },
      checking: false,
      handleCheck: jest.fn(),
      dropdown: {
        dummySid: [{ label: 'test' }, { label: 'test2' }],
      },
      loading: {},
      handleDummySid: jest.fn(),
      dummy: false,
      handleChangeSymptomp: jest.fn(),
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...props} />);
    expect(tree).toMatchSnapshot();
    // tree.props.children.props.children[2].props.children[1].props.children[2].props.children.props.onChange();
  });

  test('render other condition', () => {
    const props = {
      breadcrumb: [],
      status: {},
      submitValidation: jest.fn(),
      useform: {
        control: {},
        handleSubmit: jest.fn(),
        formState: {
          isValid: true,
          isDirty: false,
        },
      },
      checking: false,
      handleCheck: jest.fn(),
      dropdown: {
        dummySid: [{ label: 'test' }, { label: 'test2' }],
      },
      loading: {},
      handleDummySid: jest.fn(),
      dummy: true,
      handleChangeSymptomp: jest.fn(),
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render no check condition', () => {
    const props = {
      breadcrumb: [],
      status: {},
      submitValidation: jest.fn(),
      useform: {
        control: {},
        handleSubmit: jest.fn(),
        formState: {
          isValid: true,
          isDirty: true,
        },
      },
      checking: false,
      handleCheck: jest.fn(),
      dropdown: {
        dummySid: [],
      },
      loading: {},
      handleDummySid: jest.fn(),
      dummy: true,
      handleChangeSymptomp: jest.fn(),
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
