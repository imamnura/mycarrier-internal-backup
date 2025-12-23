import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Attendees from '../Attendees';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ContentManagement/Events/Add-v2/lib/sections/Attendees/index', () => {
  const props = {
    feature: [''],
    previewMode: false,
    display: {
      isDisplayAttendees: false,
      setIsDisplayAttendees: jest.fn(),
    },
    useForm: { _watch: jest.fn() },
    tab: 'id',
    classes: {},
    initialValueAttendees: [],
  };

  const useActionReturn = {
    formState: {},
    control: {},
    handleAddAttendee: jest.fn(),
    handleDeleteAttendee: jest.fn(),
    valueAttendees: [],
  };

  test('render default', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Attendees {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render initialAttendees', () => {
    const useActionReturnCustom = {
      ...useActionReturn,
      valueAttendees: ['test', 'test 2'],
    };
    const customProps = {
      ...props,
      initialValueAttendees: ['test', 'test 2'],
    };

    useActions.mockReturnValue(useActionReturnCustom);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Attendees {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.onChange(); //setIsDisplayAttendees
    tree.props.children[1].props.children[2].props.children.props.children[0].props.children.props.children[1].props.onClick(); //handleDeleteAttendee
  });
});
