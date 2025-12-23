import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { useRouter } from 'next/router';
import {
  getDetailCustomerMRTG,
  getListMRTGRequest,
} from '../../../_repositories/repositories';
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

describe('src/containers/ServiceDelivery/ApprovalMRTG/CustomerMRTGDetail-v2/hooks/useActions.js', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const setData = jest.fn();

  const props = {
    feature: [
      'read_detail_custMrtg',
      'read_list_reqMrtg',
      'read_detail_reqMrtg',
      'read_list_login_data',
      'read_detail_login_data',
    ],
  };

  const dummyData = {
    customerAccountNumber: '123',
    customerAccountName: 'PT TEST',
    isNewRequest: false,
    activatedDate: '2022-11-21T16:41:26+07:00',
    lastUpdate: '2023-01-30T22:26:59+07:00',
    loginData: [],
    noteLoginData: '',
    noteIntegrated: 'test',
    status: '',
  };

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [dummyData, setData]);
    getDetailCustomerMRTG.mockResolvedValue(dummyData);
    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
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
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
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
      query: { id: '123' },
      asPath: route.mrtg('detail', '321'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).toBeNull();
  });

  test('run with id null', async () => {
    useRouter.mockReturnValue({
      query: { id: '' },
      asPath: route.mrtg('detail', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).toBeNull();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
      push: jest.fn(),
    });

    getDetailCustomerMRTG.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.fetchDetail();
    });

    expect(result.current.fetchDetail).not.toBeUndefined();
  });
});

describe('src/containers/ServiceDelivery/ApprovalMRTG/CustomerMRTGDetail-v2/hooks/useActions.js 2', () => {
  beforeEach(() => {
    useState.mockImplementation((v) => [v, jest.fn()]);
  });

  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setSuccessAlert: jest.fn(),
    setFailedAlert: jest.fn(),
  });

  const setTab = jest.fn();
  const setList = jest.fn();

  const props = {
    feature: [
      'read_detail_custMrtg',
      'read_list_reqMrtg',
      'read_detail_reqMrtg',
      'read_list_login_data',
      'read_detail_login_data',
    ],
  };

  const props3 = {
    feature: [
      'read_detail_custMrtg',
      'read_detail_reqMrtg',
      'read_detail_login_data',
    ],
  };

  const props2 = {
    feature: [
      'read_detail_custMrtg',
      'read_list_reqMrtg',
      'read_list_login_data',
    ],
  };

  const data = [
    {
      requestId: 'MP-1669023686010',
      customerAccountNumber: '0003700008',
      customerAccountName: 'PT TELEKOMUNIKASI SELULAR',
      isNewRequest: false,
      orderDate: '2022-11-21T16:41:26+07:00',
      activatedDate: '2022-11-21T16:41:26+07:00',
      lastUpdate: '2023-01-30T22:26:59+07:00',
      status: 'INTEGRATED',
    },
    {
      requestId: 'MP-1669022914248',
      customerAccountNumber: '0003700008',
      customerAccountName: 'PT TELEKOMUNIKASI SELULAR',
      isNewRequest: false,
      orderDate: '2022-11-21T16:28:34+07:00',
      activatedDate: '2022-11-21T16:28:34+07:00',
      lastUpdate: '2022-11-21T16:28:34+07:00',
      status: 'CUSTOMER REQUEST',
    },
  ];

  test('run properly at tab login-data with privilage detail', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => ['login-data', setTab]);
    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: false },
      setList,
    ]);

    getListMRTGRequest.mockResolvedValue({
      data: data,
      meta: { page: 4, totalPages: 4 },
    });
    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.setTab('request-data');
      // result.current.onBottomPage();
      result.current.onClickRowTable({ loginDataId: '123', requestId: '123' });
    });

    // expect(result.current.onBottomPage).not.toBeUndefined();
    expect(result.current.onClickRowTable).not.toBeUndefined();
  });

  test('run properly at tab request-mrtg with privilage detail', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => ['request-mrtg', setTab]);
    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: true },
      setList,
    ]);

    getListMRTGRequest.mockResolvedValue({
      data: data,
      meta: { page: 4, totalPages: 4 },
    });
    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      // result.current.onBottomPage();
      result.current.onClickRowTable({ loginDataId: '123', requestId: '123' });
    });

    // expect(result.current.onBottomPage).not.toBeUndefined();
    expect(result.current.onClickRowTable).not.toBeUndefined();
  });

  test('run properly at tab login-data without privilage detail', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => ['login-data', setTab]);

    getListMRTGRequest.mockResolvedValue({
      data: data,
      meta: { page: 4, totalPages: 4 },
    });
    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props2));
    await act(async () => {
      // result.current.onBottomPage();
      result.current.onClickRowTable({ loginDataId: '123', requestId: '123' });
    });

    // expect(result.current.onBottomPage).not.toBeUndefined();
    expect(result.current.onClickRowTable).not.toBeUndefined();
  });

  test('run properly at tab request-mrtg without privilage detail', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => ['request-mrtg', setTab]);

    getListMRTGRequest.mockResolvedValue({
      data: data,
      meta: { page: 4, totalPages: 4 },
    });
    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props2));
    await act(async () => {
      // result.current.onBottomPage();
      result.current.onClickRowTable({ loginDataId: '123', requestId: '123' });
    });

    // expect(result.current.onBottomPage).not.toBeUndefined();
    expect(result.current.onClickRowTable).not.toBeUndefined();
  });

  test('run when failed get tab', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => ['', setTab]);

    getListMRTGRequest.mockResolvedValue({ data: [] });
    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props3));
    expect(result.current.data).not.toBeNull();
  });

  test('run with wrong path', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => ['login-data', setTab]);

    getListMRTGRequest.mockResolvedValue({ data: [] });
    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '321'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).not.toBeNull();
  });

  test('fetch rejected', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => ['login-data', setTab]);

    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
      push: jest.fn(),
    });
    getListMRTGRequest.mockRejectedValue({ message: 'error', code: 500 });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).not.toBeNull();
  });

  test('fetch rejected with other error code', async () => {
    useState.mockImplementationOnce(() => ['', jest.fn()]);
    useState.mockImplementationOnce(() => ['login-data', setTab]);

    useRouter.mockReturnValue({
      query: { id: '123' },
      asPath: route.mrtg('detail', '123'),
      push: jest.fn(),
    });

    getListMRTGRequest.mockRejectedValue({ message: 'error', code: 409 });

    const { result } = renderHook(() => useActions(props));
    expect(result.current.data).not.toBeNull();
  });
});
