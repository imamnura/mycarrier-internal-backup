import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ListItem from '../ListItem';
import styles from '../styles';

jest.mock('../styles');

describe('src/containers/ContentManagement/Homepage/List/reorderBanner/component/ListItem', () => {
  const props = {
    index: 0,
    item: {
      bannerId: 1,
      title: 'Banner Baru 1',
      status: 'active',
      linkedTo: 'test',
    },
    classes: {},
  };

  beforeAll(() => {
    styles.mockReturnValue({});
  });

  test('run properly prefix active', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListItem {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children({
      droppableProps: {},
      innerRef: {},
      dragHandleProps: {},
    });
  });

  test('render style', () => {
    expect(styles({})).not.toBeNull();
  });
});
