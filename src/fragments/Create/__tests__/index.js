import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Create from '../Create';

describe('src/fragments/Create', () => {
  const props = {
    stepperTab: <span />,
    children: <span />,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/loading', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create {...props} loading />);
    expect(tree).toMatchSnapshot();
  });
});
