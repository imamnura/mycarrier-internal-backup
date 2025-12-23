import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import useActions from '../useActions';
import { route } from '@configs';
import { useRouter } from 'next/router';
import { getListCustomerMRTG } from '../../../_repositories/repositories';
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

describe('src/containers/ServiceDelivery/ApprovalMRTG/CustomerMRTGList/hooks', () => {
  beforeEach(() => {
    useState.mockImplementation((v) => [v, jest.fn()]);
  });

  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
  });

  const setList = jest.fn();

  const props = {
    feature: ['read_list_mrtg'],
  };

  const data = [
    {
      customerAccountNumber: '123',
      customerAccountName: 'PT 123',
      totalRequest: 36,
      isNewRequest: false,
      activatedDate: '2022-11-21T16:41:26+07:00',
      lastUpdate: '2022-11-21T16:41:26+07:00',
    },
  ];

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: false },
      setList,
    ]);

    getListCustomerMRTG.mockResolvedValue({
      data: data,
      meta: { page: 4, totalPages: 4 },
    });

    useRouter.mockImplementation(() => ({
      pathname: route.mrtg('list'),
      push: jest.fn(),
    }));

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      // result.current.onBottomPage();
      result.current.onClickRowTable();
    });

    // expect(result.current.onBottomPage).not.toBeUndefined();
    expect(result.current.onClickRowTable).not.toBeUndefined();
  });

  test('run properly other states', async () => {
    const newProps = {
      feature: ['read_detail_custMrtg'],
    };

    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: true },
      setList,
    ]);

    getListCustomerMRTG.mockResolvedValue({
      data: [],
      meta: { page: 1, totalPages: 4 },
    });

    useRouter.mockImplementation(() => ({
      pathname: route.mrtg('list'),
      push: jest.fn(),
    }));

    const { result } = renderHook(() => useActions(newProps));

    await act(async () => {
      result.current.onClickRowTable({ customerAccountNumber: '123' });
      // result.current.onBottomPage();
    });

    expect(result.current.onClickRowTable).not.toBeUndefined();
    // expect(result.current.onBottomPage).not.toBeUndefined();
  });

  test('run with wrong path', async () => {
    useState.mockImplementationOnce(() => ['On Progress', jest.fn()]);

    getListCustomerMRTG.mockResolvedValue({ data: [] });

    useRouter.mockImplementation(() => ({
      pathname: '/wrong path',
      push: jest.fn(),
    }));

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).not.toBeNull();
  });

  test('fetch rejected', async () => {
    useRouter.mockImplementation(() => ({
      pathname: route.mrtg('list'),
      push: jest.fn(),
    }));

    getListCustomerMRTG.mockRejectedValue({ message: 'error', code: 500 });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).not.toBeNull();
  });

  test('fetch rejected with other error code', async () => {
    useRouter.mockImplementation(() => ({
      pathname: route.mrtg('list'),
      push: jest.fn(),
    }));

    getListCustomerMRTG.mockRejectedValue({ message: 'error', code: 409 });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).not.toBeNull();
  });
});
