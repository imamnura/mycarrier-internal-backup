import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RedList from '../component';

describe('src/components/elements/Redlist', () => {
  const props = {
    classes: {},
    data: [{ item1: 'item1' }, { item2: 'item2' }],
    child: jest.fn(),
    name: 'name',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RedList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
