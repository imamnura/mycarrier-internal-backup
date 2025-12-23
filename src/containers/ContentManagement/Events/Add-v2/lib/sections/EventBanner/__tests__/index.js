import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EventBanner from '../EventBanner';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/Events/Add-v2/lib/sections/EventBanner/index', () => {
  const useActionReturn = {
    handleUploadImage: jest.fn(),
    file: {},
    setFile: jest.fn(),
    handleEditableDesc: jest.fn(),
    descriptionid: 'test',
    descriptionen: 'test',
  };

  test('render default', () => {
    const props = { tab: 'id', previewMode: false };
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EventBanner {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children.props.onChange();
    tree.props.children[0].props.children[1].props.children.props.getUpdateItem();
  });

  test('render tab en', () => {
    const props = { tab: 'en', previewMode: false };
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EventBanner {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children.props.onChange();
    tree.props.children[0].props.children[1].props.children.props.getUpdateItem();
  });

  test('render previewMode true tab id', () => {
    const props = { tab: 'id', previewMode: true };
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EventBanner {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render previewMode true tab en', () => {
    const props = { tab: 'en', previewMode: true };
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<EventBanner {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
