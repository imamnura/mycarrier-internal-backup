import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Speakers from '../Speakers';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/Events/Add-v2/lib/sections/Speakers/index', () => {
  const props = {
    previewMode: false,
    display: {
      isDisplaySpeakers: false,
      setIsDisplaySpeakers: jest.fn(),
    },
    tab: 'id',
  };

  const useActionReturn = {
    formState: {},
    control: {},
    _control: {},
    fields: [
      { imageUrl: 'test', name: 'test', position: 'test' },
      { imageUrl: 'test 2', name: 'test 2', position: 'test' },
    ],
    remove: jest.fn(),
    file: {},
    handleAddFile: jest.fn(),
    handleAddSpeaker: jest.fn(),
    handleUpdateImage: jest.fn(),
  };

  test('render default', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Speakers {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.onChange();

    tree.props.children[1].props.children[1].props.children.props.children.props.children[0][0].props.children.props.children[1].props.onClick(); //remove

    tree.props.children[1].props.children[1].props.children.props.children.props.children[0][0].props.children.props.children[0].props.children[0].props.children.props.getUpdateItem();
  });

  test('render isDisplaySpeakers false', () => {
    const customProps = {
      ...props,
      display: {
        isDisplaySpeakers: true,
        setIsDisplaySpeakers: jest.fn(),
      },
    };

    const useActionReturnCustom = {
      ...useActionReturn,
      formState: { isValid: true },
    };
    useActions.mockReturnValue(useActionReturnCustom);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Speakers {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
