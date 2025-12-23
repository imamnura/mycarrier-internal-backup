import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getListModificationOrder,
  getFilterCustomerOptions,
  getFilterProductOptions,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import { useRouter } from 'next/router';
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

describe('src/containers/Document/ModificationOrder/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
  });
  useState.mockImplementation((v) => [v, jest.fn()]);

  const feature = [
    'read_list_on_going_modification_order',
    'read_list_upgrade_complete_modification_order',
    'read_list_downgrade_complete_modification_order',
  ];

  const setTab = jest.fn();
  const setList = jest.fn();

  test('run properly', async () => {
    useState.mockImplementationOnce(() => ['ongoing', setTab]);
    useState.mockImplementationOnce(() => [{ hasMore: true }, setList]);
    useRouter.mockImplementation(() => ({
      pathname: route.modificationOrder('list'),
      push: jest.fn(),
    }));

    getListModificationOrder.mockResolvedValue({
      data: [{ serviceId: '123' }],
    });
    getFilterCustomerOptions.mockResolvedValue({
      data: [{ custAccntNum: '123' }],
    });
    getFilterProductOptions.mockResolvedValue({
      data: [{ productName: 'test' }],
      meta: [],
    });

    const { result } = renderHook(() => useActions(feature));
    await act(async () => {
      result.current.onClickRowTable({ orderId: '123' });
      // result.current.onBottomPage();
      result.current.onClickDocument();
      result.current.setTab();
    });

    expect(result.current.list).not.toBeNull();
  });

  test('run with access to read detail', async () => {
    const newFeature = ['read_detail_modification_order'];

    useRouter.mockImplementation(() => ({
      pathname: route.modificationOrder('list'),
      push: jest.fn(),
    }));

    getListModificationOrder.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(newFeature));
    await act(async () => {
      result.current.onClickRowTable({ orderId: '123' });
    });
    expect(result.current.list).not.toBeNull();
  });

  test('run on upgrade tab', async () => {
    useState.mockImplementationOnce(() => ['upgrade', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.modificationOrder('list'),
      push: jest.fn(),
    }));

    getListModificationOrder.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(feature));
    await act(async () => {
      result.current.onClickRowTable({ orderId: '123' });
    });
    expect(result.current.list).not.toBeNull();
  });

  test('run on downgrade tab', async () => {
    useState.mockImplementationOnce(() => ['downgrade', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.modificationOrder('list'),
      push: jest.fn(),
    }));

    getListModificationOrder.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(feature));
    await act(async () => {
      result.current.onClickRowTable({ orderId: '123' });
    });
    expect(result.current.list).not.toBeNull();
  });

  test('fetch rejected', async () => {
    useState.mockImplementationOnce(() => ['ongoing', setTab]);
    useRouter.mockImplementation(() => ({
      pathname: route.modificationOrder('list'),
      push: jest.fn(),
    }));
    getListModificationOrder.mockRejectedValue({ message: 'error' });
    getFilterCustomerOptions.mockRejectedValue({ message: 'error' });
    getFilterProductOptions.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(feature));
    expect(result.current.list).not.toBeNull();
  });
});
