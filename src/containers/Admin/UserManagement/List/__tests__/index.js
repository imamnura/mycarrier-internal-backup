import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import List from '../List';
import useActions from '../hooks/useActions';
import { maskUserType } from '../utils';

jest.mock('../hooks/useActions');

describe('src/containers/Admin/UserManagement/List/index', () => {
  const useActionReturn = {
    feature: ['create_user', 'read_download_user'],
    filterStatus: {},
    list: { data: [{}, {}], meta: {} },
    loading: {
      tableRoot: false,
      tableRow: false,
    },
    onBottomPage: jest.fn(),
    onClickAddUser: jest.fn(),
    onClickRowTable: jest.fn(),
    search: 'test',
    setFilterStatus: jest.fn(),
    setSearch: jest.fn(),
    setFilterRoleType: jest.fn(),
    setFilterSegment: jest.fn(),
    setFilterUserType: jest.fn(),
    filterRoleType: {},
    filterSegment: {},
    filterUserType: {},
    optionsFilter: {
      roleType: [],
      segment: [],
    },
    formDownload: false,
    setFormDownload: jest.fn(),
    onSubmitDownload: jest.fn(),
  };

  test('render', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<List />);
    expect(tree).toMatchSnapshot();
  });

  test('maskUserType', () => {
    expect(maskUserType('customer')).toBeTruthy();
    expect(maskUserType('')).toBeTruthy();
  });
});
