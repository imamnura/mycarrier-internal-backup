import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import useActions from '../useActions';

describe('src/fragments/HeaderAndFilter/elements/LoadingBar/hooks/useActions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    const { result, waitFor } = await renderHook(() =>
      useActions({ loading: true }),
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    waitFor(() => {
      expect(result.current.progress).toBeTruthy();
    });
  });

  test('loading false', async () => {
    const { result, waitFor } = await renderHook(() =>
      useActions({ loading: false }),
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    waitFor(() => {
      expect(result.current.progress).toBe(100);
    });
  });
});
