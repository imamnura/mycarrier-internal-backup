import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getFilterCustomerOptions,
  getFilterProductOptions,
  getListPurchaseOrder,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: (cb) => cb(),
}));

describe('src/pages/Document/PurchaseOrder/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  test('run properly', async () => {
    const setList = jest.fn();
    window.open = jest.fn();

    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: true },
      setList,
    ]);
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.purchaseOrder('list'),
      push: jest.fn(),
    });
    getListPurchaseOrder.mockResolvedValue({
      data: [{}],
      meta: { totalPage: 2, page: 1 },
    });
    getFilterCustomerOptions.mockResolvedValue({
      data: [{ custAccntNum: 'x', custAccntName: 'x' }],
    });
    getFilterProductOptions.mockResolvedValue({
      data: [{ productId: 'x', productName: 'x' }],
    });

    const props = { feature: [] };

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.onClickRowTable({ orderNumber: '01' });
      result.current.onClickDocument('url')({ stopPropagation: jest.fn() });
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly/others states', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.purchaseOrder('list'),
      push: jest.fn(),
    });
    getListPurchaseOrder.mockResolvedValue({
      data: null,
      meta: { totalPage: 2, page: 4 },
    });
    getFilterCustomerOptions.mockResolvedValue({
      data: [{ custAccntNum: 'x', custAccntName: 'x' }],
    });
    getFilterProductOptions.mockResolvedValue({
      data: [{ productId: 'x', productName: 'x' }],
    });
    const props = {
      feature: ['read_detail', 'update_draft', 'read_bakes_approve'],
    };

    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.onClickRowTable({ orderNumber: '01' });
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: '/wrong-route', push: jest.fn() });
    getListPurchaseOrder.mockResolvedValue({
      data: null,
      meta: { totalPage: 2, page: 4 },
    });
    getFilterCustomerOptions.mockResolvedValue({
      data: [{ custAccntNum: 'x', custAccntName: 'x' }],
    });
    getFilterProductOptions.mockResolvedValue({
      data: [{ productId: 'x', productName: 'x' }],
    });
    const props = { feature: [] };

    const { result } = renderHook(() => useActions(props));

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: route.purchaseOrder('list') });
    getListPurchaseOrder.mockRejectedValue({ messsage: '' });
    getFilterCustomerOptions.mockRejectedValue({ messsage: '' });
    getFilterProductOptions.mockRejectedValue({ messsage: '' });
    const props = { feature: [] };

    const { result } = renderHook(() => useActions(props));

    expect(result.current.list.data).not.toBeUndefined();
  });
});
