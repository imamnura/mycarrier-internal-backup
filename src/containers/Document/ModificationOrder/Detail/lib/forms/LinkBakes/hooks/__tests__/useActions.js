import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import { useRouter } from 'next/router';
import {
  updateStatusModificationOrder,
  getBakesOptions,
} from '../../../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useActions from '../useActions';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('../../../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

const props = {
  fetchDetail: jest.fn(),
  modalLinkBakes: jest.fn(),
  setModalLinkBakes: jest.fn(),
  id: 'BAKES123',
};

describe('src/containers/Document/ModificationOrder/Detail/lib/forms/LinkBakes/hooks/useActions', () => {
  afterEach(() => {
    useState.mockImplementationOnce(() => [
      { id: 'BAKES123', typeBakes: 'test' },
    ]);
  });

  beforeEach(() => {
    usePopupAlert.mockReturnValue({
      setSuccesAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  test('run properly', async () => {
    getBakesOptions.mockResolvedValue({
      data: [{ id: 'BAKES123', typeBakes: 'test' }],
    });
    updateStatusModificationOrder.mockResolvedValue({ data: {} });
    useRouter.mockReturnValue({
      asPath: route.bakes('create'),
      push: jest.fn(),
    });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.fetchUpdateStatus(
        'BAKES123',
        { BAKESName: 'BAKES123', status: 'test', media: { file: {} } },
        'test',
      );
      result.current.fetchOptionsBakes();
      result.current.handleUpdateStatus({});
      result.current.onClose();
      result.current.onClickCrateBAKES();
    });

    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
    expect(result.current.fetchOptionsBakes).not.toBeUndefined();
    expect(result.current.handleUpdateStatus).not.toBeUndefined();
    expect(result.current.onClose).not.toBeUndefined();
    expect(result.current.onClickCrateBAKES).not.toBeUndefined();
  });

  test('run properly with chooseBakes existing', async () => {
    updateStatusModificationOrder.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.fetchUpdateStatus(
        'BAKES123',
        { BAKESName: 'BAKES123', status: 'test', media: { file: {} } },
        'test',
      );
    });

    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
  });

  test('run properly with other chooseBakes', async () => {
    updateStatusModificationOrder.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.fetchUpdateStatus(
        'BAKES123',
        { BAKESNumber: 'BAKES123', status: 'test', media: { file: {} } },
        'test',
      );
    });

    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    updateStatusModificationOrder.mockRejectedValue({ message: 'error' });
    getBakesOptions.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.fetchUpdateStatus(
        'BAKES123',
        { BAKESNumber: 'BAKES123', status: 'test', media: { file: {} } },
        'test',
      );
      result.current.fetchOptionsBakes();
    });

    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
  });
});
