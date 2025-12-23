import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DraggableElement from '../DraggableElement';
import styles from '../styles';

jest.mock('../styles');

describe('src/containers/ContentManagement/Homepage/List/reorderBanner/component/Draglist', () => {
  const props = {
    prefix: 'hide',
    elements: [
      { bannerId: 1, title: 'Banner Baru 1', status: 'active' },
      { bannerId: 2, title: 'Banner Baru 2', status: 'active' },
      { bannerId: 3, title: 'Banner Baru 3', status: 'active' },
    ],
    classes: {},
  };

  beforeAll(() => {
    styles.mockReturnValue({});
  });

  test('run properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DraggableElement {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('run properly prefix active', () => {
    const customProps = {
      ...props,
      prefix: 'active',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DraggableElement {...customProps} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[1].props.children({ droppableProps: {}, innerRef: {} });
  });

  test('render style', () => {
    expect(styles({})).not.toBeNull();
  });
});
