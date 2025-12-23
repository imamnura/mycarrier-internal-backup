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

describe('src/containers/Document/PurchaseOrder/Detail-v2/NewInstall/GameQoo/hooks/useActions', () => {
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
      'update_approvalRequest_dd',
      'update_upload_baso_fabd_purchase_order',
    ],
  };
  const resolvedData = {
    data: {
      status: 'am approval',
      bakesNumber: 'test',
      discount: '10',
      worklog: [
        {
          createdBy: '9481f965-1c9a-42c4-9409-dfe3387f0534',
          dateTime: '2022-11-28T09:43:26.001Z',
          note: 'Document Submitted',
          noteProgress: '',
          status: 'submitted',
          step: 0,
        },
      ],
      packages: [
        {
          paymentType: 'Monthly',
          description: 'Voucher GameQoo Rp30.000 Tanpa Minimal Jumlah Voucher.',
          id: '6368688f8ae06e0011cce102',
          packageName: 'Voucher GameQoo 30K',
          price: 30000,
          quantity: 1,
        },
      ],
    },
  };
  const setData = jest.fn();

  useState.mockImplementation((v) => [v, jest.fn()]);

  test('run properly', async () => {
    getDetail.mockResolvedValue(resolvedData);
    useState.mockImplementationOnce(() => [resolvedData?.data, setData]);

    let res;

    await act(async () => {
      const { result } = renderHook(() => useActions(props));
      await result.current.fetchUpdateStatus(null, {
        status: 'approved',
        success: 'success',
      });
      result.current.action();
      result.current.onClickUpdateStatus(null, {
        status: 'approved',
        success: 'success',
      })();
      result.current.onClickModalUpdateStatus()();
      result.current.onClickModalUploadBaso()();
      result.current.onClickModalDiscount()();
      result.current.handleConfirmation()();
      result.current.onCloseSuccess()();
      res = result;
    });
    expect(res.current.data).toBeTruthy();
  });

  test('run properly am approval with AMApproval true', async () => {
    const customResolvedData = {
      data: {
        status: 'am approval',
        worklog: [
          {
            createdBy: '9481f965-1c9a-42c4-9409-dfe3387f0534',
            dateTime: '2022-11-28T09:43:26.001Z',
            note: 'Document Submitted',
            noteProgress: '',
            status: 'gameqoo am approval',
            step: 0,
          },
        ],
      },
    };
    getDetail.mockResolvedValue(customResolvedData);
    useState.mockImplementationOnce(() => [customResolvedData?.data, setData]);

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

  test('run properly deliveryReturned', async () => {
    const customResolvedData = {
      data: {
        status: 'returned',
        worklog: [
          {
            createdBy: '9481f965-1c9a-42c4-9409-dfe3387f0534',
            dateTime: '2022-11-28T09:43:26.001Z',
            note: 'Document Submitted',
            noteProgress: '',
            status: 'gameqoo delivery returned',
            step: 0,
          },
        ],
      },
    };
    getDetail.mockResolvedValue(customResolvedData);
    useState.mockImplementationOnce(() => [customResolvedData?.data, setData]);

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

  test('run properly delivery approval', async () => {
    const customResolvedData = {
      data: {
        status: 'delivery approval',
        worklog: [
          {
            createdBy: '9481f965-1c9a-42c4-9409-dfe3387f0534',
            dateTime: '2022-11-28T09:43:26.001Z',
            note: 'Document Submitted',
            noteProgress: '',
            status: 'submitted',
            step: 0,
          },
        ],
      },
    };
    getDetail.mockResolvedValue(customResolvedData);
    useState.mockImplementationOnce(() => [customResolvedData?.data, setData]);

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

  test('run properly baso signed', async () => {
    const customResolvedData = {
      data: {
        status: 'baso signed',
        worklog: [
          {
            createdBy: '9481f965-1c9a-42c4-9409-dfe3387f0534',
            dateTime: '2022-11-28T09:43:26.001Z',
            note: 'Document Submitted',
            noteProgress: '',
            status: 'submitted',
            step: 0,
          },
        ],
      },
    };
    getDetail.mockResolvedValue(customResolvedData);
    useState.mockImplementationOnce(() => [customResolvedData?.data, setData]);

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
