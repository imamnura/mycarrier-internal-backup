import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  getListNotification,
  putUpdateNotification,
} from '../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useActions from '../useActions';

jest.mock('react-hook-form');
jest.mock('../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

describe('src/containers/UserProfile/NotificationSetting/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  usePopupAlert.mockReturnValue({
    setSuccessAlert: jest.fn(),
    setFailedAlert: jest.fn(),
    setLoadingAlert: jest.fn(),
  });

  useForm.mockReturnValue({
    control: {},
    register: jest.fn(),
    watch: jest.fn(),
    setValue: jest.fn(),
    reset: jest.fn(),
    formState: {
      dirtyFields: { purchaseOrder: { email: true, whatsapp: true } },
      isDirty: true,
    },
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const setList = jest.fn();

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      [{ slug: 'test', email: true, whatsapp: true }],
      setList,
    ]);
    getListNotification.mockResolvedValue([
      { slug: 'test', email: true, whatsapp: true },
    ]);
    putUpdateNotification.mockResolvedValue({ data: {} });
    useRouter.mockReturnValue({
      pathname: route.notificationSetting(),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions());
    await act(async () => {
      result.current.fetchUpdateNotification({
        purchaseOrder: { email: true, whatsapp: true },
      });
      result.current.onSubmit();
    });

    expect(result.current.groupedData).not.toBeUndefined();
    expect(result.current.onSubmit).not.toBeUndefined();
    expect(result.current.fetchUpdateNotification).not.toBeUndefined();
  });

  test('run with wrong path', async () => {
    useRouter.mockReturnValue({ pathname: '/wrong-path', push: jest.fn() });

    const { result } = renderHook(() => useActions());

    await act(async () => {
      result.current.fetchUpdateNotification({
        test: { email: true, whatsapp: true },
      });
    });

    expect(result.current.fetchUpdateNotification).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    useRouter.mockReturnValue({
      pathname: route.notificationSetting(),
      push: jest.fn(),
    });

    getListNotification.mockRejectedValue({ message: 'error' });
    putUpdateNotification.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions());

    await act(async () => {
      result.current.fetchUpdateNotification({
        neucentrix: { email: true, whatsapp: true },
      });
    });

    expect(result.current.fetchUpdateNotification).not.toBeUndefined();
  });
});
