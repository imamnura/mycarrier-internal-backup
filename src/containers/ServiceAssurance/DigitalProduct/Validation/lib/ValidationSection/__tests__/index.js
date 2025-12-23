import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Form from '../index';
import useStyles from '../styles';
import { cleanup } from '@testing-library/react-hooks/server';

jest.mock('../styles');

describe('src/containers/ServiceAssurance/DigitalProduct/Validation/lib/ValidationSection', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    useStyles.mockReturnValue({ classes: {} });
  });

  const props = {
    breadcrumb: [],
    status: {},
    submitValidation: jest.fn(),
    useform: {
      control: {},
      handleSubmit: jest.fn(),
      formState: {},
      setValue: jest.fn(),
    },
    checking: false,
    handleCheck: jest.fn(),
    handleDummySid: jest.fn(),
    dummy: false,
    dropdown: {},
    loading: {},
    detail: {},
    fetch: {},
    onChangeDropdown: {
      setSegmentValue: jest.fn(),
      setServiceValue: jest.fn(),
      handleDummyClick: jest.fn(),
    },
  };

  test('render', () => {
    // const payload = {
    //   symptompName: 'test',
    //   symptompId: 'test',
    //   symptompDesc: 'test',
    //   symptompPath: 'test',
    // };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...props} />);
    expect(tree).toMatchSnapshot();
    // tree.props.children.props.children[2].props.children[1].props.children[2].props.children.props.onChange(
    //   payload,
    // );
  });

  test('render another state', () => {
    const customProps = {
      ...props,
      dummy: true,
      dropdown: { dummySid: [{ label: 'test' }, { label: 'test2' }] },
      detail: {
        manualSid: 'test',
        picName: '',
        picContact: '',
        description: 'test',
      },
      useform: {
        control: {},
        handleSubmit: jest.fn(),
        formState: {
          isValid: true,
        },
        setValue: jest.fn(),
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render another state formState checking', () => {
    const customProps = {
      ...props,
      dummy: false,
      detail: {
        manualSid: 'test',
        picName: '',
        picContact: '',
        description: 'test',
      },
      useform: {
        control: {},
        handleSubmit: jest.fn(),
        formState: {
          isValid: true,
          isDirty: true,
        },
        setValue: jest.fn(),
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Form {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
