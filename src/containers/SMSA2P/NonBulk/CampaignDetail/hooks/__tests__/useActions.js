import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { useRouter } from 'next/router';
import { getDetailCampaign } from '../../../_repositories/repositories';
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

describe('src/containers/SMSA2P/NonBulk/CampaignDetail/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const setData = jest.fn();

  const props = {
    feature: ['read_detail_non_bulk'],
  };

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      {
        status: 'On Progress',
        orderNumber: 'NB-123',
        campaignChildId: 'CD-123',
      },
      setData,
    ]);
    getDetailCampaign.mockResolvedValue({
      status: 'On Progress',
      orderNumber: 'NB-123',
      campaignChildId: 'CD-123',
    });
    useRouter.mockReturnValue({
      query: { id: 'NB-123', params: 'CD-123' },
      asPath: route.nonBulk('campaign', 'NB-123', 'CD-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.fetchDetail();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });

  test('run properly with other status', async () => {
    useState.mockImplementationOnce(() => [
      { status: 'Completed', orderNumber: 'NB-123', campaignChildId: 'CD-123' },
      setData,
    ]);
    getDetailCampaign.mockResolvedValue({
      status: 'Completed',
      orderNumber: 'NB-123',
      campaignChildId: 'CD-123',
    });
    useRouter.mockReturnValue({
      query: { id: 'NB-123', params: 'CD-123' },
      asPath: route.nonBulk('campaign', 'NB-123', 'CD-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.fetchDetail();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });

  test('run without privilage', async () => {
    useRouter.mockReturnValue({
      query: { id: 'NB-123', params: 'CD-123' },
      asPath: route.nonBulk('campaign', 'NB-123', 'CD-123'),
      push: jest.fn(),
    });

    renderHook(() =>
      useActions({
        feature: [],
      }),
    );
  });

  test('run with wrong path', async () => {
    useRouter.mockReturnValue({
      query: { id: 'NB-123', params: 'CD-123' },
      asPath: route.nonBulk('campaign', 'NB-312', 'CD-321'),
      push: jest.fn(),
    });

    renderHook(() => useActions(props));
  });

  test('run with id null', async () => {
    useRouter.mockReturnValue({
      query: { id: '', params: '' },
      asPath: route.nonBulk('campaign', 'NB-123', 'CD-123'),
      push: jest.fn(),
    });

    renderHook(() => useActions(props));
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      query: { id: 'NB-123', params: 'CD-123' },
      asPath: route.nonBulk('campaign', 'NB-123', 'CD-123'),
      push: jest.fn(),
    });

    getDetailCampaign.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.fetchDetail();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });
});
