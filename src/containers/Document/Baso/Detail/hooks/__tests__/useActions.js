import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { useRouter } from 'next/router';
import { getDetailBaso } from '../../../_repositories/repositories';
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

describe('src/containers/Document/Baso/Detail-v2/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setFailedAlert: jest.fn(),
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const setData = jest.fn();

  const props = {
    feature: [],
  };

  const dataComplete = {
    status: 'BA COMPLETE',
    orderNumber: 'NB-123',
    worklog: [
      {
        step: 1,
        status: 'NEED CUST SIGN',
        dateTime: '2022-12-29T02:52:05.580Z',
        note: 'The activation letter needs to be signed',
        noteProgress: null,
        createdBy: 'blitz',
      },
      {
        step: 2,
        status: 'RETURNED',
        dateTime: '2022-12-29T08:56:52.792Z',
        note: 'Return from Customer',
        noteProgress: null,
        createdBy: 'c7fadb73-d8ed-433b-829c-302f599b7a10',
      },
      {
        step: 3,
        status: 'AM RETURNED',
        dateTime: '2022-12-29T08:58:36.334Z',
        note: 'tess',
        noteProgress: null,
        createdBy: '5fb41ab5-2a90-4523-abc3-231741222e7b',
      },
      {
        step: 4,
        status: 'SIGNED',
        dateTime: '2022-12-29T08:59:15.345Z',
        note: null,
        noteProgress: null,
        createdBy: 'c7fadb73-d8ed-433b-829c-302f599b7a10',
      },
      {
        step: 5,
        status: 'BA COMPLETE',
        dateTime: '2022-12-29T08:59:15.346Z',
        note: 'Your activation letter has been signed',
        noteProgress: null,
        createdBy: 'c7fadb73-d8ed-433b-829c-302f599b7a10',
      },
    ],
  };

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      { status: 'RETURNED', orderNumber: 'NB-123' },
      setData,
    ]);
    getDetailBaso.mockResolvedValue({
      status: 'RETURNED',
      orderNumber: 'NB-123',
    });
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.baso('detail', 'NB-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.statusData();
      result.current.action();
      result.current.action()[0].onClick();
      result.current.action()[1].onClick();
    });

    expect(result.current.statusData).not.toBeUndefined();
    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly with BA COMPLETE Status', async () => {
    useState.mockImplementationOnce(() => [dataComplete, setData]);
    getDetailBaso.mockResolvedValue(dataComplete);
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.baso('detail', 'NB-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run properly with BA COMPLETE Status different worklog', async () => {
    useState.mockImplementationOnce(() => [
      {
        ...dataComplete,
        worklog: [
          {
            step: 3,
            status: 'AM RETURNED',
            dateTime: '2022-12-29T08:58:36.334Z',
            note: 'tess',
            noteProgress: null,
            createdBy: '5fb41ab5-2a90-4523-abc3-231741222e7b',
          },
          {
            step: 4,
            status: 'SIGNED',
            dateTime: '2022-12-29T08:59:15.345Z',
            note: null,
            noteProgress: null,
            createdBy: 'c7fadb73-d8ed-433b-829c-302f599b7a10',
          },
          {
            step: 5,
            status: 'RATE US',
            dateTime: '2022-12-29T08:59:15.346Z',
            note: 'Your activation letter has been signed',
            noteProgress: null,
            createdBy: 'c7fadb73-d8ed-433b-829c-302f599b7a10',
          },
        ],
      },
      setData,
    ]);
    getDetailBaso.mockResolvedValue({
      ...dataComplete,
      worklog: [
        {
          step: 3,
          status: 'AM RETURNED',
          dateTime: '2022-12-29T08:58:36.334Z',
          note: 'tess',
          noteProgress: null,
          createdBy: '5fb41ab5-2a90-4523-abc3-231741222e7b',
        },
        {
          step: 4,
          status: 'SIGNED',
          dateTime: '2022-12-29T08:59:15.345Z',
          note: null,
          noteProgress: null,
          createdBy: 'c7fadb73-d8ed-433b-829c-302f599b7a10',
        },
        {
          step: 5,
          status: 'RATE US',
          dateTime: '2022-12-29T08:59:15.346Z',
          note: 'Your activation letter has been signed',
          noteProgress: null,
          createdBy: 'c7fadb73-d8ed-433b-829c-302f599b7a10',
        },
      ],
    });
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.baso('detail', 'NB-123'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions(props));
    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });

  test('run with id null', async () => {
    useRouter.mockReturnValue({
      query: { id: '' },
      asPath: route.baso('detail', 'NB-253'),
      push: jest.fn(),
    });

    renderHook(() => useActions(props));
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      query: { id: 'NB-123' },
      asPath: route.baso('detail', 'NB-123'),
      push: jest.fn(),
    });

    getDetailBaso.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      result.current.action();
    });

    expect(result.current.action).not.toBeUndefined();
  });
});
