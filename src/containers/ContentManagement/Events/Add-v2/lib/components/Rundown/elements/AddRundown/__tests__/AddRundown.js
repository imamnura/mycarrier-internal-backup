import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AddRundown from '../AddRundown';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');

const props = {
  classes: {},
  onSubmit: () => {},
  baseDate: 'test',
  tab: 'id',
  setValue: jest.fn(),
  minTime: 'test',
  type: 'eventDay',
  initialTitle: 'test',
  initialError: false,
};

describe('src/containers/ContentManagement/Events/Add-v2/lib/components/Rundown/elements/AddRundown', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    useStyles.mockReturnValue({ classes: {} });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddRundown {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.children[1].props.children[1].props.children[0].props.onChange(
      { target: { value: 'test' } },
    ); //setTitle
    tree.props.children.props.children[2].props.children.props.onClick(); //onSubmit
  });

  test('render error', () => {
    const customProps = { ...props, initialError: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddRundown {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
