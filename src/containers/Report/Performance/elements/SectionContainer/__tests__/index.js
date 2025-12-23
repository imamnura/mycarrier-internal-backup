import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TableLegends from '../SectionContainer';

describe('src/fragment-v2/Performance/lib/TableLegends', () => {
  const props = {
    children: <div />,
    title: 'abc',
  };

  test('render success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TableLegends {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
