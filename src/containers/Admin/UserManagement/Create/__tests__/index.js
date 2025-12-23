import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Create from '../Create';
import useAction from '../hooks/useAction';
import { breadcrumb } from '../utils';

jest.mock('../hooks/useAction');

describe('src/containers/Admin/UserManagement/Create/index', () => {
  const useActionReturn = {
    data: {},
    loading: false,
    setTab: jest.fn(),
    tab: 1,
    setData: jest.fn(),
  };

  test('render tab 1', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab 2', () => {
    useAction.mockReturnValue({ ...useActionReturn, tab: 2 });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();
  });

  test('breadcrumb', () => {
    expect(breadcrumb('user id')).toBeTruthy();
    expect(breadcrumb('')).toBeTruthy();
  });
});
