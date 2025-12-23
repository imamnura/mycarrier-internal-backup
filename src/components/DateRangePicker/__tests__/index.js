import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DateRangePicker from '../DateRangePicker';

describe('src/components/DateRangePicker', () => {
  const props = {
    onChange: jest.fn(),
  };

  test('render/primary', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <DateRangePicker variant="primary" {...props} />,
    );
    expect(tree).toMatchSnapshot();
  });
  test('render/secondary', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <DateRangePicker variant="secondary" {...props} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
