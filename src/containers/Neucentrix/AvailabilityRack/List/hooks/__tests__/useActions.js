import { useState } from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import {
  getListAvailabilityRack,
  getDataAvailabilityRack,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (cb) => cb(),
  useState: jest.fn(),
}));

describe('src/containers/Neucentrix/AvailabilityRack/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  useState.mockImplementation((v) => [v, jest.fn()]);

  const accessProps = {
    feature: ['read_availability_rack'],
  };

  const setList = jest.fn();

  test('run properly', async () => {
    useState.mockImplementationOnce(() => [
      { data: [], meta: {}, hasMore: true },
      setList,
    ]);
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    getListAvailabilityRack.mockResolvedValue({ data: [] }),
      getDataAvailabilityRack.mockResolvedValue({});

    const { result } = renderHook(() => useActions(accessProps));

    act(() => {
      // result.current.onBottomPage();
      result.current.handleRefresh();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly without access', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    getListAvailabilityRack.mockResolvedValue({ data: [] }),
      getDataAvailabilityRack.mockResolvedValue({});

    const props = { feature: [] };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      // result.current.onBottomPage();
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    getListAvailabilityRack.mockRejectedValue({ message: '' });
    getDataAvailabilityRack.mockRejectedValue({ message: '' });

    const { result } = renderHook(() => useActions(accessProps));

    expect(result.current.list.data).not.toBeUndefined();
  });
});
