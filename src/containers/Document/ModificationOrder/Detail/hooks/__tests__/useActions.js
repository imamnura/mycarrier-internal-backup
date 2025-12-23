import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { useRouter } from 'next/router';
// import { route } from '@configs';
import {
  getDetailModificationOrder,
  updateStatusModificationOrder,
} from '../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useActions from '../useActions';

jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
// jest.mock('notistack');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

describe('src/containers/Document/ModificationOrder/Detail/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setSuccesAlert: jest.fn(),
    setFailedAlert: jest.fn(),
    setLoadingAlert: jest.fn(),
  });

  usePopupConfirmation.mockReturnValue({
    setConfirmation: jest.fn(),
    closeConfirmation: jest.fn(),
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const setData = jest.fn();

  const props = {
    id: 'PO123',
  };

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      { status: 'Upgrade Request', orderNumber: 'PO123' },
      setData,
    ]);
    getDetailModificationOrder.mockReturnValue({
      data: { status: 'Upgrade Request', orderNumber: 'PO123' },
    });
    updateStatusModificationOrder.mockResolvedValue({ data: {} });
    useRouter.mockReturnValue({
      query: { id: 'PO123' },
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.action();
      result.current.fetchDetail();
      result.current.fetchUpdateStatus({
        orderNumber: 'PO123',
        updateTo: 'test',
        success: 'test',
      });
      result.current.action()[0].onClick();
      result.current.action()[1].onClick();
      result.current.action()[2].onClick();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
    expect(result.current.action).not.toBeUndefined();
    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
  });

  test('run properly with status Review Bakes', async () => {
    useState.mockImplementationOnce(() => [
      { status: 'Review Bakes', orderNumber: 'PO123' },
      setData,
    ]);
    getDetailModificationOrder.mockReturnValue({
      data: { status: 'Review Bakes', orderNumber: 'PO123' },
    });
    useRouter.mockReturnValue({
      query: { id: 'PO123' },
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.action();
      result.current.action()[0].onClick(true);
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly with Service Upgrading', async () => {
    useState.mockImplementationOnce(() => [
      { status: 'Service Upgrading', worklog: [{ status: 'test' }] },
      setData,
    ]);
    getDetailModificationOrder.mockReturnValue({
      data: { status: 'Service Upgrading', orderNumber: 'PO123' },
    });
    useRouter.mockReturnValue({
      query: { id: 'PO123' },
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run with id null', async () => {
    useRouter.mockReturnValue({
      query: { id: 'PO123' },
    });

    getDetailModificationOrder.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run with other condition', async () => {
    updateStatusModificationOrder.mockResolvedValue({ success: {} });
    getDetailModificationOrder.mockReturnValue({
      data: { status: 'Upgrade Request', orderNumber: 'PO123' },
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.action();
      result.current.fetchDetail();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });

  test('run with action forward to operator', async () => {
    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.action();
    });
  });

  test('fetch rejected', async () => {
    updateStatusModificationOrder.mockRejectedValue({ message: 'error' });
    getDetailModificationOrder.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.fetchUpdateStatus({
        orderNumber: 'PO123',
        updateTo: 'test',
        success: 'test',
      });
    });

    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
  });
});
