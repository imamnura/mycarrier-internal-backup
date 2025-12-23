import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getListLinkActivation,
  getListCustomerLink,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: (cb) => cb(),
}));

describe('src/containers/SMSA2P/Link/list/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
  });
  useState.mockImplementation((v) => [v, jest.fn()]);

  const props = {
    feature: ['read_list_request', 'read_list_active'],
  };

  const setTab = jest.fn();
  const setList = jest.fn();
  const setDateRange = jest.fn();
  const setStatus = jest.fn();

  test('run properly', async () => {
    useState.mockImplementationOnce(() => ['progress', setTab]);
    useState.mockImplementationOnce(() => [{ hasMore: true }, setList]);
    useState.mockImplementationOnce(() => [{ value: 'checking' }, setStatus]);
    useState.mockImplementationOnce(() => [
      ['2021-12-14T08:12:21.472Z', '2021-12-14T08:12:21.472Z'],
      setDateRange,
    ]);
    useRouter.mockImplementation(() => ({
      pathname: route.link('list'),
      push: jest.fn(),
    }));

    getListLinkActivation.mockResolvedValue({ data: [] });
    getListCustomerLink.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.onClickRowTable({ orderNumber: '123' });

      result.current.onClickRefresh();
    });
  });

  test('run with access to read detail', async () => {
    const newProps = {
      feature: ['read_detail'],
    };
    useRouter.mockImplementation(() => ({
      pathname: route.link('list'),
      push: jest.fn(),
    }));

    getListLinkActivation.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(newProps));
    await act(async () => {
      result.current.onClickRowTable({ orderNumber: '123' });
    });
  });

  test('run on active tab', async () => {
    useState.mockImplementationOnce(() => ['done', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.link('list'),
      push: jest.fn(),
    }));

    getListLinkActivation.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.onClickRowTable({ orderNumber: '123' });
    });
  });

  test('fetch rejected', async () => {
    useState.mockImplementationOnce(() => ['done', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.link('list'),
      push: jest.fn(),
    }));
    getListLinkActivation.mockRejectedValue({ message: 'error' });
    getListCustomerLink.mockRejectedValue({ message: 'error' });
  });
});
