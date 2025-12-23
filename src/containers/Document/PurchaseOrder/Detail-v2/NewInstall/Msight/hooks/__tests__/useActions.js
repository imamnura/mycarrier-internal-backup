import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import useActions from '../useActions';
import {
  getDetail,
  updateStatus,
} from '../../../../../_repositories/repositories';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('next/router');
jest.mock('../../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: (cb) => cb(),
}));

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/Msight/hooks/useActions', () => {
  afterEach(cleanup);

  beforeEach(() => {
    useRouter.mockReturnValue({
      query: { id: 'PO123', productName: 'msight' },
      push: jest.fn(),
    });
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
      'update_forward_to_operator_purchase_order',
      'update_input_api_key_purchase_order',
      'input_secret_key_purchase_order',
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
      await result.current.fetchUpdateStatus({ status: 'approved' });
      await result.current.fetchMsightBakes({ data: {} });
      result.current.action();
      result.current.onClickApprove();
      result.current.onClickModalUpdateStatus()();
      result.current.onCloseSuccess();
      result.current.onSubmitForward()();
      result.current.onClickForwardOperator();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly as delivery', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [
      { status: 'delivery approval' },
      setData,
    ]);
    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.action();
    });
    expect(result.current.data).toBeTruthy();
  });

  test('run properly as operator', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [
      { status: 'operator approval' },
      setData,
    ]);
    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.action();
    });
    expect(result.current.data).toBeTruthy();
  });

  test('run properly as operator check', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [
      { status: 'operator checking' },
      setData,
    ]);
    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.action();
    });
    expect(result.current.data).toBeTruthy();
  });

  test('run without id', async () => {
    useRouter.mockReturnValue({ query: {}, push: jest.fn() });
    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).toBeTruthy();
  });

  test('run without access', async () => {
    useState.mockImplementationOnce(() => [
      { status: 'operator approval' },
      setData,
    ]);
    const { result } = renderHook(() => useActions({ feature: [] }));

    await act(async () => {
      result.current.action();
    });
    expect(result.current.data).toBeTruthy();
  });

  test('fetch rejected', async () => {
    getDetail.mockRejectedValue({ message: 'error' });
    updateStatus.mockRejectedValue({ message: 'error' });
    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus({ status: 'approved' });
      await result.current.fetchMsightBakes({ data: {} });
      res = result;
    });

    expect(res.current.data).toBeTruthy();
  });
});
