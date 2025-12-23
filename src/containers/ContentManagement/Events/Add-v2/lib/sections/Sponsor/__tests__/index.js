import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Sponsor from '../Sponsor';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/Events/Add-v2/lib/sections/Sponsor/index', () => {
  const props = {
    previewMode: false,
    display: {
      isDisplaySponsor: false,
      setIsDisplaySponsor: jest.fn(),
    },
    tab: 'id',
  };

  const useActionReturn = {
    fields: [
      { mediaId: 'test', name: 'test' },
      { mediaId: 'test 2', name: 'test 2' },
    ],
    remove: jest.fn(),
    file: {},
    handleAddFile: jest.fn(),
    handleAddSponsor: jest.fn(),
    handleUpdateImage: jest.fn(),
  };

  test('render default', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Sponsor {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.onChange();

    tree.props.children[1].props.children[1].props.children.props.children.props.children[0][0].props.children.props.children[1].props.onClick(); //remove

    tree.props.children[1].props.children[1].props.children.props.children.props.children[0][0].props.children.props.children[0].props.children.props.children.props.getUpdateItem(); //handleUpdateImage

    tree.props.children[1].props.children[1].props.children.props.children.props.children[1].props.children.props.children[0].props.children.props.children.props.getUpdateItem(); //handleAddFile
  });

  test('render isDisplaySponsor false', () => {
    const customProps = {
      ...props,
      display: {
        isDisplaySponsor: true,
        setIsDisplaySponsor: jest.fn(),
      },
    };

    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Sponsor {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
