import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ActionHighlight from '../ActionHighlight';
import useStyles from '../styles';

jest.mock('../styles');

describe('src/containers/Admin/UserManagement/Detail/elements/ActionHighlight', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  const props = {
    title: 'test',
    subTitle: 'test',
    action: {
      children: 'EDIT PROFILE',
      onClick: jest.fn(),
    },
    variant: 'default',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ActionHighlight {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render subTitle array', () => {
    const customProps = {
      ...props,
      subTitle: [
        'Please contact Account Manager to inform this user request has been rejected.',
        `Note: test`,
      ],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ActionHighlight {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
