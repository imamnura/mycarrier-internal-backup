import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks/server';
import { updateStatusModificationOrder } from '../../../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useActions from '../useActions';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('../../../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

const props = {
  fetchDetail: jest.fn(),
  modalLinkBakes: jest.fn(),
  setModalUpdateStatus: jest.fn(),
  id: 'BAKES123',
};

describe('src/containers/Document/Modification/Detail/lib/forms/UpdateStatusForm/hooks/useActions', () => {
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
    updateStatusModificationOrder.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.fetchUpdateStatus('BAKES123', { status: 'test' });
      result.current.handleUpdateStatus();
      result.current.onClose();
    });

    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
    expect(result.current.handleUpdateStatus).not.toBeUndefined();
    expect(result.current.onClose).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    updateStatusModificationOrder.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.fetchUpdateStatus('BAKES123', { status: 'test' });
      result.current.handleUpdateStatus();
    });

    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
    expect(result.current.handleUpdateStatus).not.toBeUndefined();
  });
});
