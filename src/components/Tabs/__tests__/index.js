import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import Tabs from '../Tabs';

describe('src/components/Tabs', () => {
  const props = {
    options: [{ value: '1', label: 'Tab Name' }],
    onChange: jest.fn(),
    value: '1',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Tabs {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/centered', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Tabs {...props} variant="centered" />);
    expect(tree).toMatchSnapshot();
  });

  test('render/others', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Tabs
        {...props}
        onSwap={jest.fn()}
        options={[
          { value: '1', label: 'Tab Name 1' },
          { value: '2', label: 'Tab Name 2' },
        ]}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('func/onChange', () => {
    const root = TestRenderer.create(<Tabs {...props} />).root;
    root.findByProps({ id: 'tabs' }).props.onChange(null, 'val2');
    expect(props.onChange).toHaveBeenCalled();
  });
});
