import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TimePickerForm from '../TimePickerForm';

describe('src/components/TimePickerForm', () => {
  const props = {
    onChange: jest.fn(),
  };

  test('render/primary', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <TimePickerForm variant="primary" {...props} />,
    );
    expect(tree).toMatchSnapshot();
  });
  test('render/secondary', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <TimePickerForm variant="secondary" {...props} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
