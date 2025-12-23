import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  FileUpload,
  OTPInput,
  PhoneInput,
  RadioGroup,
  Select,
  Switch,
  TextField,
  TextFieldMasked,
  TimePicker,
} from '../index';
import Wysiwyg from '../Wysiwyg';

describe('src/components/FormField', () => {
  test('TextField', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TextField control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('Select', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Select control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('RadioGroup', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <RadioGroup control={{}} name="name" options={[]} />,
    );
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('PhoneInput', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PhoneInput control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('PhoneInput/62', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PhoneInput control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
        value: '08111111111',
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('OTPInput', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <OTPInput control={{}} name="name" onChange={jest.fn()} />,
    );
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('DateRangePicker', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DateRangePicker control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('AutoComplete', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AutoComplete control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('DatePicker', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DatePicker control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('DateTimePicker', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DateTimePicker control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('TimePicker', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TimePicker control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('Switch', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Switch control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('FileUpload', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<FileUpload control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('TextFieldMasked', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <TextFieldMasked control={{}} maskType="currency" name="name" />,
    );
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('Checkbox', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Checkbox control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });

  test('Wysiwyg', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Wysiwyg control={{}} name="name" />);
    tree.props.render({
      field: {
        onChange: jest.fn(),
      },
      fieldState: {},
    });
    expect(tree).toMatchSnapshot();
  });
});
