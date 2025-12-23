import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import useActions from '../useActions';
import { route } from '@configs';
import { useRouter } from 'next/router';
import {
  getListNonBulk,
  getListCustomerNonBulk,
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

describe('src/containers/SMSA2P/NonBulk/List/hooks/useActions', () => {
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

  const props = {
    feature: ['read_list_non_bulk_request', 'read_list_non_bulk_active'],
  };

  const data = [
    {
      customer: 'LINTAS JARINGAN NUSANTARA',
      orderNumber: 'NB-1662455547159',
      campaignName: 'campaign3334',
      campaignType: 'LBA',
      orderDate: '2022-09-06T16:12:46+07:00',
      lastUpdate: '2022-09-06T16:12:46+07:00',
      status: 'On Progress',
    },
  ];

  test('run properly', async () => {
    useState.mockImplementationOnce(() => ['On Progress', setTab]);
    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: false },
      setList,
    ]);

    getListNonBulk.mockResolvedValue({
      data: data,
      meta: { page: 4, totalPages: 4 },
    });
    getListCustomerNonBulk.mockResolvedValue({ data: [] });

    useRouter.mockImplementation(() => ({
      pathname: route.nonBulk('list'),
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
      feature: ['read_detail_non_bulk'],
    };

    useState.mockImplementationOnce(() => ['Completed', setTab]);
    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: true },
      setList,
    ]);
    useState.mockImplementationOnce(() => [
      ['2022-10-04T17:00:00.000Z', '2022-10-27T17:00:00.000Z'],
      setFilterDateRange,
    ]);

    getListNonBulk.mockResolvedValue({
      data: [],
      meta: { page: 1, totalPages: 4 },
    });

    useRouter.mockImplementation(() => ({
      pathname: route.nonBulk('list'),
      push: jest.fn(),
    }));

    const { result } = renderHook(() => useActions(newProps));

    await act(async () => {
      result.current.onClickRowTable({ orderNumber: 'NB-1662455547159' });
    });

    expect(result.current.onClickRowTable).not.toBeUndefined();
  });

  test('run when failed get tab', async () => {
    useState.mockImplementationOnce(() => ['', setTab]);

    getListNonBulk.mockResolvedValue({ data: [] });

    useRouter.mockImplementation(() => ({
      pathname: route.nonBulk('list'),
      push: jest.fn(),
    }));

    renderHook(() => useActions(props));
  });

  test('run with wrong path', async () => {
    useState.mockImplementationOnce(() => ['On Progress', setTab]);

    getListNonBulk.mockResolvedValue({ data: [] });

    useRouter.mockImplementation(() => ({
      pathname: '/wrong path',
      push: jest.fn(),
    }));

    renderHook(() => useActions(props));
  });

  test('fetch rejected', async () => {
    useState.mockImplementationOnce(() => ['On Progress', setTab]);

    useRouter.mockImplementation(() => ({
      pathname: route.nonBulk('list'),
      push: jest.fn(),
    }));

    getListCustomerNonBulk.mockRejectedValue({ message: 'error' });
    getListNonBulk.mockRejectedValue({ message: 'error', code: 500 });

    renderHook(() => useActions(props));
  });

  test('fetch rejected with other error code', async () => {
    useState.mockImplementationOnce(() => ['On Progress', setTab]);

    useRouter.mockImplementation(() => ({
      pathname: route.nonBulk('list'),
      push: jest.fn(),
    }));

    getListNonBulk.mockRejectedValue({ message: 'error', code: 409 });

    renderHook(() => useActions(props));
  });
});
