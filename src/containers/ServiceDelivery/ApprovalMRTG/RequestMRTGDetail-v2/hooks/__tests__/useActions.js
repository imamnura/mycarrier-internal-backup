import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { useRouter } from 'next/router';
import {
  getDetailRequestMRTG,
  getListMRTGService,
} from '../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useActions from '../useActions';

jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

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

describe('src/containers/ServiceDelivery/ApprovalMRTG/CustomerMRTGDetail-v2/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
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

  useState.mockImplementation((v) => [v, jest.fn()]);

  const setData = jest.fn();

  const props = {
    feature: ['read_list_service', 'read_detail_reqMrtg', 'update_login_data'],
  };

  let dummyData = {
    requestId: '123',
    noteRequest: '',
    noteLoginData: '',
    noteIntegrated: '',
    serviceLocation:
      'telkom palembang centrum Jl Kapten anwar sastro sungai pangeran kec ilir timur palembang PALEMBANG Indonesia',
    activatedDate: '2022-10-20T20:07:18+07:00',
    lastUpdate: '2022-10-20T20:07:18+07:00',
    status: 'CUSTOMER REQUEST',
    customerAccountName: 'GRATIKA',
    customerAccountNumber: '0003700029',
  };

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      { ...dummyData, status: 'CUSTOMER REQUEST' },
      setData,
    ]);
    getDetailRequestMRTG.mockResolvedValue({
      ...dummyData,
      status: 'CUSTOMER REQUEST',
    });
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.fetchDetail();
      result.current.action();
      result.current.action()[0].onClick();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly without privilage', async () => {
    useState.mockImplementationOnce(() => [
      { ...dummyData, status: 'CUSTOMER REQUEST' },
      setData,
    ]);
    getDetailRequestMRTG.mockResolvedValue({
      ...dummyData,
      status: 'CUSTOMER REQUEST',
    });
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() =>
      useActions({
        feature: ['read_list_service', 'read_detail_reqMrtg'],
      }),
    );
    await act(async () => {
      result.current.fetchDetail();
      result.current.action();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly with other state', async () => {
    useState.mockImplementationOnce(() => [
      { ...dummyData, status: 'INTEGRATED' },
      setData,
    ]);
    getDetailRequestMRTG.mockResolvedValue({
      ...dummyData,
      status: 'INTEGRATED',
    });
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.fetchDetail();
      result.current.action();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });

  test('run without privilage', async () => {
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() =>
      useActions({
        feature: [],
      }),
    );
    expect(result.current.data).toBeNull();
  });

  test('run with wrong path', async () => {
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '321'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).toBeNull();
  });

  test('run with id null', async () => {
    useRouter.mockReturnValue({
      query: { id: '', params: '' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).toBeNull();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });

    getDetailRequestMRTG.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.fetchDetail();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });
});

describe('src/containers/ServiceDelivery/ApprovalMRTG/CustomerMRTGDetail-v2/hooks/useActions 2', () => {
  beforeEach(() => {
    useState.mockImplementation((v) => [v, jest.fn()]);
  });

  afterEach(() => {
    cleanup();
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

  const setList = jest.fn();

  const props = {
    feature: ['read_list_service', 'read_detail_reqMrtg', 'update_login_data'],
  };

  const data = [
    {
      serviceId: '1250233851',
      productName: 'VPN IP Node',
      serviceLocation:
        'telkom palembang centrum Jl Kapten anwar sastro sungai pangeran kec ilir timur palembang PALEMBANG Indonesia',
      activatedDate: '2022-10-20T20:07:18+07:00',
      lastUpdate: '2022-10-20T20:07:18+07:00',
      status: 'Active',
    },
  ];

  test('run properly with privilage detail', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: false },
      setList,
    ]);

    getListMRTGService.mockResolvedValue({
      data: data,
      meta: { page: 4, totalPages: 4 },
    });
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      // result.current.onBottomPage();
    });

    expect(result.current.data).not.toBeUndefined();
  });

  test('run properly with privilage detail and other state', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: true },
      setList,
    ]);

    getListMRTGService.mockResolvedValue({
      data: data,
      meta: { page: 4, totalPages: 4 },
    });
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      // result.current.onBottomPage();
    });

    expect(result.current.data).not.toBeUndefined();
  });

  test('run with wrong path', async () => {
    getListMRTGService.mockResolvedValue({ data: [] });
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '321'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).toBeNull();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });
    getListMRTGService.mockRejectedValue({ message: 'error', code: 500 });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).toBeNull();
  });

  test('fetch rejected with other error code', async () => {
    useRouter.mockReturnValue({
      query: { id: '123', params: '123' },
      asPath: route.mrtg('request-mrtg', '123', '123'),
      push: jest.fn(),
    });

    getListMRTGService.mockRejectedValue({ message: 'error', code: 409 });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).toBeNull();
  });
});
