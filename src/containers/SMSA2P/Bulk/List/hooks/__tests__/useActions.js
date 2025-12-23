import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getListCustomerSender,
  getListSender,
  getListOperatorSender,
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

describe('src/containers/SMSA2P/Bulk/list/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
  });
  useState.mockImplementation((v) => [v, jest.fn()]);

  const props = {
    feature: ['read_list_bulk_request', 'read_list_bulk_active'],
  };

  const setTab = jest.fn();
  const setList = jest.fn();
  const setDateRange = jest.fn();
  const setStatus = jest.fn();

  test('run properly', async () => {
    useState.mockImplementationOnce(() => ['onprogress', setTab]);
    useState.mockImplementationOnce(() => [{ hasMore: true }, setList]);
    useState.mockImplementationOnce(() => [{ value: 'checking' }, setStatus]);
    useState.mockImplementationOnce(() => [
      ['2021-12-14T08:12:21.472Z', '2021-12-14T08:12:21.472Z'],
      setDateRange,
    ]);
    useRouter.mockImplementation(() => ({
      pathname: route.bulk('list'),
      push: jest.fn(),
    }));

    getListSender.mockResolvedValue({ data: [] });
    getListCustomerSender.mockResolvedValue({ data: [] });
    getListOperatorSender.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.onClickRowTable({ orderNumber: '123' });
      result.current.onClickRefresh();
    });
  });

  test('run with access to read detail', async () => {
    const newProps = {
      feature: ['read_detail_bulk'],
    };
    useRouter.mockImplementation(() => ({
      pathname: route.bulk('list'),
      push: jest.fn(),
    }));

    getListSender.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(newProps));
    await act(async () => {
      result.current.onClickRowTable({ orderNumber: '123' });
    });
  });

  test('run on active tab', async () => {
    useState.mockImplementationOnce(() => ['done', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.bulk('list'),
      push: jest.fn(),
    }));

    getListSender.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.onClickRowTable({ orderNumber: '123' });
    });
  });

  test('fetch rejected', async () => {
    useState.mockImplementationOnce(() => ['done', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.bulk('list'),
      push: jest.fn(),
    }));
    getListSender.mockRejectedValue({ message: 'error' });
    getListCustomerSender.mockRejectedValue({ message: 'error' });
    getListOperatorSender.mockRejectedValue({ message: 'error' });
  });
});
