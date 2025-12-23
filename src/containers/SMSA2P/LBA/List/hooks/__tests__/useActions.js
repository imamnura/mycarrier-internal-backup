import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import useActions from '../useActions';
import { route } from '@configs';
import { useRouter } from 'next/router';
import {
  getListLBA,
  getListCustomerLBA,
} from '../../../_repositories/repositories';
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

describe('src/containers/SMSA2P/LBA/List/hooks/useActions', () => {
  beforeEach(() => {
    useState.mockImplementation((v) => [v, jest.fn()]);
  });

  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setSuccessAlert: jest.fn(),
    setFailedAlert: jest.fn(),
  });

  const setTab = jest.fn();
  const setList = jest.fn();
  const setFilterDateRange = jest.fn();
  const setFilterStatus = jest.fn();

  const props = {
    id: 'LBA123',
    feature: ['read_list_request', 'read_list_active'],
  };

  const data = [
    {
      activationStatus: 'checking',
      lbaCategory: ['LBA', 'LBA Targeted'],
      provider: 'telkomsel',
    },
  ];

  test('run properly', async () => {
    useState.mockImplementationOnce(() => ['progress', setTab]);
    getListLBA.mockResolvedValue({
      data: data,
      meta: { page: 4, totalPages: 4 },
    });
    getListCustomerLBA.mockResolvedValue({ data: [] });
    useRouter.mockImplementation(() => ({
      pathname: route.lba('list'),
      push: jest.fn(),
    }));

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.onClickRefresh();

      result.current.onClickRowTable();
    });

    expect(result.current.onClickRefresh).not.toBeUndefined();
    expect(result.current.onClickRowTable).not.toBeUndefined();
  });

  test('run properly at tab done & other states', async () => {
    const newProps = {
      feature: ['read_detail'],
    };
    useState.mockImplementationOnce(() => ['done', setTab]);
    useState.mockImplementationOnce(() => [{ hasMore: true }, setList]);
    useState.mockImplementationOnce(() => [
      ['2022-10-04T17:00:00.000Z', '2022-10-27T17:00:00.000Z'],
      setFilterDateRange,
    ]);
    useState.mockImplementationOnce(() => [
      { value: 'checking', label: 'Checking' },
      setFilterStatus,
    ]);

    getListLBA.mockResolvedValue({
      data: [],
      meta: { page: 1, totalPages: 4 },
    });
    useRouter.mockImplementation(() => ({
      pathname: route.lba('list'),
      push: jest.fn(),
    }));

    const { result } = renderHook(() => useActions(newProps));
    await act(async () => {
      result.current.onClickRowTable({ orderNumber: 'LBA123' });
    });

    expect(result.current.onClickRowTable).not.toBeUndefined();
  });

  test('run when failed get tab', async () => {
    getListLBA.mockResolvedValue({ data: [] });
    useState.mockImplementationOnce(() => ['', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.lba('list'),
      push: jest.fn(),
    }));

    renderHook(() => useActions(props));
  });

  test('run with wrong path', async () => {
    getListLBA.mockResolvedValue({ data: [] });
    useState.mockImplementationOnce(() => ['progress', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: '/wrong path',
      push: jest.fn(),
    }));

    renderHook(() => useActions(props));
  });

  test('fetch rejected', async () => {
    useState.mockImplementationOnce(() => ['progress', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.lba('list'),
      push: jest.fn(),
    }));

    getListCustomerLBA.mockRejectedValue({ message: 'error' });
    getListLBA.mockRejectedValue({ message: 'error', code: 500 });

    renderHook(() => useActions(props));
  });

  test('fetch rejected with other error code', async () => {
    useState.mockImplementationOnce(() => ['progress', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.lba('list'),
      push: jest.fn(),
    }));

    getListLBA.mockRejectedValue({ message: 'error', code: 409 });

    renderHook(() => useActions(props));
  });
});
