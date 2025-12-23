import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { updateStepVisitNcx } from '../../../../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('../../../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: (cb) => cb(),
}));

const props = {
  setModalUpdateStatus: jest.fn(),
  id: 'VST123',
};

describe('src/containers/Neucentrix/VisitNeucentrix/Detail-v2/lib/forms/UpdateStatusForm/hooks', () => {
  beforeEach(() => {
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  test('run properly', async () => {
    updateStepVisitNcx.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      await result.current.fetchUpdateStatus('VST123', {});
      result.current.onClose();
      result.current.handleUpdateStatus({});
    });

    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
    expect(result.current.handleUpdateStatus).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    updateStepVisitNcx.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions({ ...props }));

    await act(async () => {
      await result.current.fetchUpdateStatus('VST123', {});
    });

    expect(result.current.fetchUpdateStatus).not.toBeUndefined();
  });
});
