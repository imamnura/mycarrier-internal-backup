import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UserType from '../UserType';
import useStyles from '../styles';
import useAction from '../hooks/useAction';

jest.mock('../styles');
jest.mock('../hooks/useAction');

describe('src/containers/Admin/UserManagement/Create/elements/UserProfile/elements/UserType/index', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  const props = { loading: false };

  const useActionReturn = {
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
    setUserType: jest.fn(),
    userType: 'internal_staff',
    userId: 'test',
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<UserType {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
