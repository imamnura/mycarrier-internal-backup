import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import BarChart from '../BarChart';

describe('src/components/BarChart', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <BarChart data={[{ value: 0 }]} layout="horizontal" leftLabel="label" />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('null axisLeft', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <BarChart
        axisLeft={null}
        data={[]}
        layout="horizontal"
        leftLabel="label"
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
