import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { getListMTTR } from '../../../../../../../_repositories/repositories';
import useActions from '../useActions';

jest.mock('../../../../../../../_repositories/repositories');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

describe('src/containers/ServiceDelivery/ServiceList/Detail/MRTG/elements/ModalMTTR/hooks', () => {
  afterEach(() => {
    cleanup();
  });

  const props = {
    modalMTTR: true,
    setModalMTTR: jest.fn(),
  };

  useState.mockImplementation((v) => [v, jest.fn()]);

  test('run properly', async () => {
    getListMTTR.mockResolvedValue({ data: {} });

    const { result } = renderHook(() =>
      useActions({ ...props, id: 'MTTR123' }),
    );

    act(() => {
      result.current.onClose();
    });

    expect(result.current.dataMTTR).not.toBeUndefined();
  });

  test('run properly error', async () => {
    getListMTTR.mockResolvedValue({ metaData: {} });

    const { result } = renderHook(() =>
      useActions({ ...props, id: 'MTTR123' }),
    );

    act(() => {
      result.current.onClose();
    });

    expect(result.current.dataMTTR).not.toBeUndefined();
  });

  test('run properly without id', async () => {
    getListMTTR.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.onClose();
    });

    expect(result.current.dataMTTR).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    getListMTTR.mockRejectedValue({ message: '' });

    renderHook(() => useActions({ ...props, id: 'MTTR123' }));
  });
});
