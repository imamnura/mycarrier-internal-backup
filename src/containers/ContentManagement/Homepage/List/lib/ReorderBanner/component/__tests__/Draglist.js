import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DragList from '../DragList';
import styles from '../styles';

jest.mock('../styles');

describe('src/containers/ContentManagement/Homepage/List/reorderBanner/component/Draglist', () => {
  const props = {
    bannerActive: [],
    bannerHide: [],
    onChangeBannerActive: jest.fn(),
    onChangeBannerHide: jest.fn(),
  };

  beforeAll(() => {
    styles.mockReturnValue({});
  });

  const resultDragEnd = {
    destination: {
      droppableId: 'active',
      index: 1,
    },
    source: {
      droppableId: 'active',
      index: 2,
    },
  };

  test('run properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DragList {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.onDragEnd(resultDragEnd);
  });

  test('run properly destination not found', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DragList {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.onDragEnd({});
  });

  test('run properly banner active more than 5', () => {
    const customProps = {
      bannerActive: [
        { bannerId: 1, title: 'Banner Baru 1', status: 'hide' },
        { bannerId: 2, title: 'Banner Baru 2', status: 'active' },
        { bannerId: 3, title: 'Banner Baru 3', status: 'active' },
        { bannerId: 4, title: 'Banner Baru 4', status: 'active' },
        { bannerId: 5, title: 'Banner Baru 5', status: 'active' },
        { bannerId: 6, title: 'Banner Baru 6', status: 'active' },
        { bannerId: 7, title: 'Banner Baru 1', status: 'active' },
      ],
      bannerHide: [],
      onChangeBannerActive: jest.fn(),
      onChangeBannerHide: jest.fn(),
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DragList {...customProps} />);
    expect(tree).toMatchSnapshot();
    tree.props.onDragEnd({
      destination: {
        droppableId: 'active',
      },
      source: {
        droppableId: 'hide',
      },
    });
  });

  test('render style', () => {
    expect(styles({})).not.toBeNull();
  });
});
