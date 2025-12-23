import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { useRouter } from 'next/router';
import {
  getDetailLoginData,
  deleteLoginData,
} from '../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useActions from '../useActions';

jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

describe('src/containers/ServiceDelivery/ApprovalMRTG/LoginDataDetail/hooks', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });

    jest.useFakeTimers();
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const setData = jest.fn();

  const props = {
    feature: [
      'update_login_data',
      'read_detail_login_data',
      'delete_login_data',
    ],
  };

  let data = {
    loginDataId: 'LD-123',
    username: 'test',
    password: 'test',
    note: 'gw mo akun login buat 10 user',
  };

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      { ...data, status: 'ON PROGRESS' },
      setData,
    ]);
    getDetailLoginData.mockResolvedValue({ ...data, status: 'ON PROGRESS' });
    useRouter.mockReturnValue({
      query: { id: '123', params: 'LD-123' },
      asPath: route.mrtg('login-data', '123', 'LD-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.fetchDetail();
      result.current.action();
      result.current.action()[0].onClick();
    });

    await expect(result.current.data).toBeTruthy();
  });

  test('run properly with other status', async () => {
    useState.mockImplementationOnce(() => [
      { ...data, status: 'COMPLETED' },
      setData,
    ]);
    getDetailLoginData.mockResolvedValue({ ...data, status: 'COMPLETED' });
    deleteLoginData.mockResolvedValue({ data: '' });
    useRouter.mockReturnValue({
      query: { id: '123', params: 'LD-123' },
      asPath: route.mrtg('login-data', '123', 'LD-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.fetchDetail();
      result.current.action();
      result.current.action()[0].onClick();
      result.current.action()[1].onClick();
      result.current.onCloseAfterDelete({})();
      await result.current.fetchDeleteLoginData({})();
    });

    await expect(result.current.data).toBeTruthy();
  });

  test('run properly with other status 2', async () => {
    useState.mockImplementationOnce(() => [
      { ...data, status: 'COMPLETED' },
      setData,
    ]);
    getDetailLoginData.mockResolvedValue({ ...data, status: 'COMPLETED' });
    deleteLoginData.mockRejectedValue({ message: 'xx' });
    useRouter.mockReturnValue({
      query: { id: '123', params: 'LD-123' },
      asPath: route.mrtg('login-data', '123', 'LD-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.fetchDetail();
      result.current.action();
      result.current.action()[0].onClick();
      result.current.action()[1].onClick();
      result.current.onCloseAfterDelete({})();
      await result.current.fetchDeleteLoginData({})();
    });

    await expect(result.current.data).toBeTruthy();
  });

  test('run properly without privilage actions', async () => {
    useState.mockImplementationOnce(() => [
      { ...data, status: 'ON PROGRESS' },
      setData,
    ]);
    getDetailLoginData.mockResolvedValue({ ...data, status: 'ON PROGRESS' });
    useRouter.mockReturnValue({
      query: { id: '123', params: 'LD-123' },
      asPath: route.mrtg('login-data', '123', 'LD-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() =>
      useActions({
        feature: ['read_detail_login_data'],
      }),
    );
    await act(async () => {
      result.current.fetchDetail();
      result.current.action();
    });

    await expect(result.current.data).toBeTruthy();
  });

  test('run properly with other status without privilage actions', async () => {
    useState.mockImplementationOnce(() => [
      { ...data, status: 'COMPLETED' },
      setData,
    ]);
    getDetailLoginData.mockResolvedValue({ ...data, status: 'COMPLETED' });
    useRouter.mockReturnValue({
      query: { id: '123', params: 'LD-123' },
      asPath: route.mrtg('login-data', '123', 'LD-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() =>
      useActions({
        feature: ['read_detail_login_data'],
      }),
    );
    await act(async () => {
      result.current.fetchDetail();
      result.current.action();
    });

    await expect(result.current.data).toBeTruthy();
  });

  test('run with wrong path', async () => {
    useRouter.mockReturnValue({
      query: { id: '123', params: 'LD-123' },
      asPath: route.mrtg('login-data', '123', 'LD-321'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));

    await expect(result.current.data).not.toBeTruthy();
  });

  test('run with id null', async () => {
    useRouter.mockReturnValue({
      query: { id: '', params: '' },
      asPath: route.mrtg('login-data', '123', 'LD-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));

    await expect(result.current.data).not.toBeTruthy();
  });

  test('run withot privilage', async () => {
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('login-data', '123', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() =>
      useActions({
        feature: [],
      }),
    );

    await expect(result.current.data).not.toBeTruthy();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      query: { id: '123', params: 'LD-123' },
      asPath: route.mrtg('login-data', '123', 'LD-123'),
      push: jest.fn(),
    });

    getDetailLoginData.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.fetchDetail();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });
});
