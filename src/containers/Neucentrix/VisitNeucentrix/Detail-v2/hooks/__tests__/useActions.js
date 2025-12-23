import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  updateStepVisitNcx,
  getDetailVisitNcx,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { privilege } from '../../utils';

jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('../../utils');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: (cb) => cb(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const props = {
  feature: [],
};

const setData = jest.fn();

describe('src/containers/Neucentrix/VisitNeucentrix/Detail-v2/hooks', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      query: { id: 'VST123' },
    });

    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });

    privilege.mockReturnValue({ canApproveAm: false, canRejectAm: false });
  });

  const occState = {
    status: 'checking',
    isAssigned: true,
    isForwarded: false,
    isUrgentCase: true,
  };

  const amState = { status: 'checking', isAssigned: true, isForwarded: false };
  const marketingState = {
    status: 'checking',
    isAssigned: false,
    isForwarded: false,
  };

  useState.mockImplementation((v) => [v, jest.fn()]);

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      {
        status: 'visit completed',
        historyActivity: [{ activity: 'CHECKIN' }],
      },
      setData,
    ]);
    updateStepVisitNcx.mockResolvedValue({ data: {} });
    getDetailVisitNcx.mockResolvedValue({
      data: {
        document: [
          { type: 'spk', fileName: 'test.png', fileUrl: 'https://test.com' },
        ],
      },
    });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.fetchDetail();
      result.current.fetchUpdateStatus({
        id: 'VST123',
        updateTo: 'approved',
        success: 'success',
      });
      result.current.action();
      result.current.tableData;
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly as am', async () => {
    useState.mockImplementationOnce(() => [amState, setData]);
    privilege.mockReturnValue({ canApproveAm: true, canRejectAm: true });
    updateStepVisitNcx.mockResolvedValue({ data: {} });
    getDetailVisitNcx.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run with no access as am', async () => {
    useState.mockImplementationOnce(() => [amState, setData]);
    privilege.mockReturnValue({ canApproveAm: false, canRejectAm: false });
    updateStepVisitNcx.mockResolvedValue({ data: {} });
    getDetailVisitNcx.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly as occ', async () => {
    useState.mockImplementationOnce(() => [occState, setData]);
    privilege.mockReturnValue({ canApproveOcc: true, canRejectOcc: true });
    updateStepVisitNcx.mockResolvedValue({ data: {} });
    getDetailVisitNcx.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly with no access as occ', async () => {
    useState.mockImplementationOnce(() => [occState, setData]);
    privilege.mockReturnValue({ canApproveOcc: false, canRejectOcc: false });
    updateStepVisitNcx.mockResolvedValue({ data: {} });
    getDetailVisitNcx.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly as marketing', async () => {
    useState.mockImplementationOnce(() => [marketingState, setData]);
    privilege.mockReturnValue({
      canApproveMarketing: true,
      canRejectMarketing: true,
    });
    updateStepVisitNcx.mockResolvedValue({ data: {} });
    getDetailVisitNcx.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly with no access as marketing', async () => {
    useState.mockImplementationOnce(() => [marketingState, setData]);
    privilege.mockReturnValue({
      canApproveMarketing: false,
      canRejectMarketing: false,
    });
    updateStepVisitNcx.mockResolvedValue({ data: {} });
    getDetailVisitNcx.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run when visitId null', async () => {
    getDetailVisitNcx.mockResolvedValue({ data: {} });
    useRouter.mockReturnValue({
      query: { id: '' },
    });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.fetchDetail();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    updateStepVisitNcx.mockRejectedValue({ message: 'error' });
    getDetailVisitNcx.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      await result.current.fetchDetail();
      await result.current.fetchUpdateStatus('VST123', {});
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
  });
});
