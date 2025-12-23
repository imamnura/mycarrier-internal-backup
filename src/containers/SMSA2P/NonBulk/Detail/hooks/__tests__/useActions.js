import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { useRouter } from 'next/router';
import { getDetailNonBulk } from '../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useActions from '../useActions';

jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

describe('src/containers/SMSA2P/NonBulk/Detail/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const setData = jest.fn();

  const props = {
    feature: ['read_detail_non_bulk', 'update_complete', 'edit_non_bulk'],
  };

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      { orderInformation: { status: 'On Progress', orderNumber: 'NB-123' } },
      setData,
    ]);
    getDetailNonBulk.mockResolvedValue({
      orderInformation: { status: 'On Progress', orderNumber: 'NB-123' },
    });
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.nonBulk('detail', 'NB-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.action();
      result.current.onClickEdit();
      result.current.onClickDetailCampaign();
      result.current.action()[0].onClick();
      result.current.action()[1].onClick();
    });

    expect(result.current.action).not.toBeUndefined();
    expect(result.current.onClickEdit).not.toBeUndefined();
    expect(result.current.onClickDetailCampaign).not.toBeUndefined();
  });

  test('run properly with Completed Status', async () => {
    useState.mockImplementationOnce(() => [
      { orderInformation: { status: 'Completed', orderNumber: 'NB-123' } },
      setData,
    ]);
    getDetailNonBulk.mockResolvedValue({
      orderInformation: { status: 'Completed', orderNumber: 'NB-123' },
    });
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.nonBulk('detail', 'NB-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run without privilage', async () => {
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.nonBulk('detail', 'NB-123'),
      push: jest.fn(),
    });

    renderHook(() =>
      useActions({
        feature: [],
      }),
    );
  });

  test('run without privilage actions', async () => {
    useState.mockImplementationOnce(() => [
      { orderInformation: { status: 'On Progress', orderNumber: 'NB-123' } },
      setData,
    ]);
    getDetailNonBulk.mockResolvedValue({
      orderInformation: { status: 'On Progress', orderNumber: 'NB-123' },
    });
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.nonBulk('detail', 'NB-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() =>
      useActions({
        feature: ['read_detail_non_bulk'],
      }),
    );
    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run with wrong path', async () => {
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.nonBulk('detail', 'NB-253'),
      push: jest.fn(),
    });

    renderHook(() => useActions(props));
  });

  test('run with id null', async () => {
    useRouter.mockReturnValue({
      query: { id: '' },
      asPath: route.nonBulk('detail', 'NB-253'),
      push: jest.fn(),
    });

    renderHook(() => useActions(props));
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.nonBulk('detail', 'NB-123'),
      push: jest.fn(),
    });

    getDetailNonBulk.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });
});
