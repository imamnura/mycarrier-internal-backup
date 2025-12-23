import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SearchDrawer from '../SearchDrawer';

const props = {
  children: <span />,
  onClose: jest.fn(),
  open: true,
};

describe('src/layouts/Main/elements/Header/components/SearchDrawer', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SearchDrawer {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
