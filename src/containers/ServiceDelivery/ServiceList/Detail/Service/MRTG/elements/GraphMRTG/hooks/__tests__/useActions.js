import { useState } from 'react';
import { renderHook, cleanup } from '@testing-library/react-hooks/server';
import { getMRTGgraph } from '../../../../../../../_repositories/repositories';
import useActions from '../useActions';

jest.mock('../../../../../../../_repositories/repositories');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

describe('src/containers/ServiceDelivery/ProductList/Detail/MRTG/elements/GraphMRTG/hooks', () => {
  afterEach(() => {
    cleanup();
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const props = {
    data: {
      id: 'MRTG123',
      detailProduct: {
        burstable: true,
      },
    },
  };

  const setFilterDateRange = jest.fn();

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      ['09/10/2022', '09/10/2022'],
      setFilterDateRange,
    ]);
    getMRTGgraph.mockResolvedValue({ data: [] });

    const { result } = renderHook(() =>
      useActions({
        data: {
          id: 'MRTG123',
          detailProduct: {},
        },
      }),
    );

    expect(result.current.dataMRTGgraph).not.toBeUndefined();
  });

  test('run properly & is not burstable', async () => {
    useState.mockImplementationOnce(() => [
      ['09/10/2022', '09/10/2022'],
      setFilterDateRange,
    ]);
    getMRTGgraph.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useActions(props));

    expect(result.current.dataMRTGgraph).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    getMRTGgraph.mockRejectedValue({ message: '' });

    renderHook(() => useActions(props));

    const { result } = renderHook(() => useActions(props));

    expect(result.current.dataMRTGgraph).not.toBeUndefined();
  });
});
