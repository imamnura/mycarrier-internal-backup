import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SearchBox from '../SearchBox';

describe('src/components/SearchBox', () => {
  test('render', () => {
    const props = {
      onChange: jest.fn(),
      withTooltip: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SearchBox {...props} />);
    tree.props.children.props.onChange({ target: { value: 'x' } });
    expect(tree).toMatchSnapshot();
  });

  test('render/other', () => {
    const props = {
      size: 'large',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SearchBox {...props} />);
    tree.props.children.props.onChange({ target: { value: 'x' } });
    expect(tree).toMatchSnapshot();
  });
});
