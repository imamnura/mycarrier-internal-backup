import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TableLegends from '../TableLegends';

describe('src/fragment-v2/Performance/lib/TableLegends', () => {
  const props = {
    data: [{ title: '1' }, { title: '2' }],
    loading: false,
  };

  test('render success', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TableLegends {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    const customProps = {
      loading: true,
      data: [],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TableLegends {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
