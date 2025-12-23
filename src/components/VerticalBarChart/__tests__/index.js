import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import VerticalBarChart from '../VerticalBarChart';

describe('src/components/VerticalBarChart', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <VerticalBarChart legends={[{ color: '#000', label: 'Label' }]} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
