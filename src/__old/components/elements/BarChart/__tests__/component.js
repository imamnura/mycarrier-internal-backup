import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import BarChart from '../component';

describe('src/components/elements/BarChart', () => {
  const props = {
    classes: {},
    keys: ['legendLabel', 'legendLabel2'],
    color: ['#'],
    data: [{ legendLabel: 10 }],
    label: 'label',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<BarChart {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
