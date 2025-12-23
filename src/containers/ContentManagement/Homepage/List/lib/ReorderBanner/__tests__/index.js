import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../ReorderBanner';

describe('src/containers/ContentManagement/Homepage/List/reorderBanner/index', () => {
  const props = {
    listBannerActive: [],
    listBannerHide: [],
    setOpenDialogReorder: jest.fn(),
    openDialogReorder: false,
    setListBannerActive: jest.fn(),
    setListBannerHide: jest.fn(),
    confirmSaveReorder: jest.fn(),
    classes: {},
    onClose: jest.fn(),
  };

  test('run properly', () => {
    Component.defaultProps.confirmSaveReorder();
    Component.defaultProps.setListBannerActive();
    Component.defaultProps.setListBannerHide();
    Component.defaultProps.setOpenDialogReorder();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('run properly other state', () => {
    const customProps = {
      ...props,
      openDialogReorder: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[2].props.children[0].props.onClick(); //btn cancel
    tree.props.children[2].props.children[1].props.onClick(); //btn save
    tree.props.children[1].props.children.props.children.props.children.props.onChangeBannerActive();
    tree.props.children[1].props.children.props.children.props.children.props.onChangeBannerHide();
  });
});
