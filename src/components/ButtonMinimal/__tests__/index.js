import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ButtonMinimal from '../ButtonMinimal';

describe('src/components/ButtonMinimal', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    ButtonMinimal.defaultProps.onClick();
    const tree = shallow.render(<ButtonMinimal variant="add" />);
    tree.props.onClick();
    expect(tree).toMatchSnapshot();
  });
});
