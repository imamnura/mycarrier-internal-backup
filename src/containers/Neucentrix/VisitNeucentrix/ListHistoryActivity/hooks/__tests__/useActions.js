import { useState } from 'react';
import { renderHook, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getVisitHistoryList,
  getDropdownOption,
} from '../../../_repositories/repositories';
import { useRouter } from 'next/router';
import useActions from '../useActions';

jest.mock('../../../_repositories/repositories');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: (cb) => cb(),
}));

describe('src/containers/Neucentrix/VisitNeucentrix/ListHistoryActivity/hooks/useActions', () => {
  beforeEach(() => {
    useState.mockImplementation((v) => [v, jest.fn()]);
  });

  afterEach(() => {
    cleanup();
  });

  const props = {
    feature: [],
  };

  test('run properly', async () => {
    getVisitHistoryList.mockResolvedValue({ data: [] });
    getDropdownOption.mockResolvedValue({
      data: ['test', 'options', 'visitor'],
    });
    useRouter.mockImplementation(() => ({
      asPath: route.visitNcx('history', 'TEST123'),
      query: { id: 'TEST123' },
      push: jest.fn(),
    }));

    const { result } = renderHook(() => useActions(props));
    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run with wrong path', async () => {
    getVisitHistoryList.mockResolvedValue({ data: [] });
    getDropdownOption.mockResolvedValue({ data: [] });
    useRouter.mockImplementation(() => ({
      asPath: '/wrong-path',
      query: { id: 'TEST123' },
      push: jest.fn(),
    }));

    const { result } = renderHook(() => useActions(props));
    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    useRouter.mockImplementation(() => ({
      asPath: route.visitNcx('history', 'TEST123'),
      query: { id: 'TEST123' },
      push: jest.fn(),
    }));

    getVisitHistoryList.mockRejectedValue({ message: 'error' });
    getDropdownOption.mockRejectedValue({ message: 'error' });

    renderHook(() => useActions(props));
  });
});
