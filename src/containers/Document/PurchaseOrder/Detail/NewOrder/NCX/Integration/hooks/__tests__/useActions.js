import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import useActions from '../useActions';
import {
  getDetail,
  updateStatus,
} from '../../../../../../_repositories/repositories';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('next/router');
jest.mock('../../../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: (cb) => cb(),
}));

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewOrder/NCX/Integration/hooks/useActions', () => {
  afterEach(cleanup);

  beforeEach(() => {
    useRouter.mockReturnValue({
      query: { id: 'PO123', productName: 'gameqoo' },
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
      'update_approvalRequest_segment',
    ],
  };
  const resolvedData = {
    orderNumber: 'PO-76198526',
    bakesNumber: 'Tel.1250/YN 000/COP-J3E00000/2023',
    custAccntNum: '0003700007',
    custAccntName: 'PT INDOSAT TBK',
    status: 'am approval',
    productName: 'neucentrix cndc',
  };

  useState.mockImplementation((v) => [v, jest.fn()]);
  const setData = jest.fn();

  test('run properly', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [resolvedData, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus(
        {},
        { status: 'approved', success: 'success' },
      );
      await result.current.fetchDetail();
      result.current.action();
      result.current.onClickUpdateStatus(
        {},
        { status: 'approved', success: 'success' },
      )();
      result.current.onUpdateStatus()();
      result.current.handleConfirmation()();
      result.current.onCloseSuccess();
      result.current.onClickNeucentrix({ isSubmitted: true })();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly with label draft', async () => {
    const customResolvedData = {
      ...resolvedData,
      status: 'am approval',
      label: 'draft',
    };
    getDetail.mockResolvedValue(customResolvedData);
    useState.mockImplementationOnce(() => [customResolvedData, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus(null, {
        status: 'approved',
        success: 'success',
      });
      result.current.action();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly with label completed', async () => {
    const customResolvedData = {
      ...resolvedData,
      status: 'am approval',
      label: 'completed',
    };
    getDetail.mockResolvedValue(customResolvedData);
    useState.mockImplementationOnce(() => [customResolvedData, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus(null, {
        status: 'approved',
        success: 'success',
      });
      result.current.action();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly with status segment returned', async () => {
    const customResolvedData = {
      ...resolvedData,
      status: 'segment returned',
    };
    getDetail.mockResolvedValue(customResolvedData);
    useState.mockImplementationOnce(() => [customResolvedData, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus(null, {
        status: 'approved',
        success: 'success',
      });
      result.current.action();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly with status segment approval', async () => {
    const customResolvedData = {
      ...resolvedData,
      status: 'segment approval',
    };
    getDetail.mockResolvedValue(customResolvedData);
    useState.mockImplementationOnce(() => [customResolvedData, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus(null, {
        status: 'approved',
        success: 'success',
      });
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
      await result.current.fetchUpdateStatus(null, {
        status: 'approved',
        success: 'success',
      });
      res = result;
    });

    expect(res.current.data).toBeNull();
  });
});
