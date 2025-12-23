import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SingleStackedBarChart from '../SingleStackedBarChart';

describe('src/components/SingleStackedBarChart', () => {
  const props = {
    data: [
      { value: 'test', color: 'test' },
      { value: 'test', color: 'test' },
      { value: 'test', color: 'test' },
    ],
    all: 1,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SingleStackedBarChart {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
