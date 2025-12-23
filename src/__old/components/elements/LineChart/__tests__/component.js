import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LineChart from '../component';

describe('src/components/elements/LineChart', () => {
  const props = {
    classes: {},
    data: [{ data: 'data' }],
    label: 'label',
    color: ['color1', 'color2'],
    keys: ['keys1', 'keys2'],
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LineChart {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
