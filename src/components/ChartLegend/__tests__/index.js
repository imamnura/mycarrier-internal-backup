import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ChartLegend from '../ChartLegend';

describe('src/components/ChartLegend', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ChartLegend />);
    expect(tree).toMatchSnapshot();
  });
});
