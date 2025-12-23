import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import useActions from '../useActions';
import {
  getDetail,
  updateStatus,
} from '../../../../_repositories/repositories';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('next/router');
jest.mock('../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: (cb) => cb(),
}));

describe('src/containers/Document/PurchaseOrder/Detail/Trial/hooks/useActions', () => {
  afterEach(cleanup);

  beforeEach(() => {
    useRouter.mockReturnValue({ query: { id: 'PO123' }, push: jest.fn() });
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
    setSuccessAlert: jest.fn(),
    setLoadingAlert: jest.fn(),
  });

  usePopupConfirmation.mockReturnValue({
    setConfirmation: jest.fn(),
    closeConfirmation: jest.fn(),
  });

  const props = {
    feature: [
      'read_detail',
      'update_approvalRequest_am',
      'update_approvalRequest_wds',
      'update_approvalRequest_am',
    ],
  };
  const resolvedData = {
    data: { status: 'am approval' },
  };
  const setData = jest.fn();

  useState.mockImplementation((v) => [v, jest.fn()]);

  test('run properly', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [{ status: 'am approval' }, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus({ status: 'wds approval' });
      result.current.action();
      result.current.onClickModalUpdateStatus()();
      result.current.onCloseSuccess()();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly without privilage update', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [{ status: 'am approval' }, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() =>
        useActions({
          feature: ['read_detail'],
        }),
      );
      result.current.action();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly status wds approval', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [
      { status: 'wds approval' },
      setData,
    ]);

    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      result.current.action();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly status wds approval without privilage update', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [
      { status: 'wds approval' },
      setData,
    ]);

    let res;

    await act(async () => {
      const { result } = renderHook(() =>
        useActions({
          feature: ['read_detail'],
        }),
      );
      result.current.action();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly status am returned', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [{ status: 'am returned' }, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      result.current.action();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly status am returned without privilage update', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [{ status: 'am returned' }, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() =>
        useActions({
          feature: ['read_detail'],
        }),
      );
      result.current.action();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run without id', async () => {
    useRouter.mockReturnValue({ query: {}, push: jest.fn() });
    const { result } = renderHook(() => useActions(props));

    expect(result.current.data).toBeNull();
  });

  test('run without access', async () => {
    const { result } = renderHook(() => useActions({ feature: [] }));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.data).toBeNull();
  });

  test('fetch rejected', async () => {
    getDetail.mockRejectedValue({ message: 'error' });
    updateStatus.mockRejectedValue({ message: 'error' });
    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus({ status: 'approved' });
      res = result;
    });

    expect(res.current.data).toBeNull();
  });
});
