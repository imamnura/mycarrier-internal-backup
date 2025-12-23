import { renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';
import useOption from '../useOption';

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();

  return {
    ...originReact,
    useRef: mUseRef,
  };
});

describe('src/components/Dropdown/hooks/useOption', () => {
  test('run properly', () => {
    useRef.mockReturnValue({
      current: {
        offsetWidth: 1,
        scrollWidth: 2,
      },
    });
    const { result } = renderHook(() => useOption());

    expect(result.current.isLabelTruncate).toEqual(true);
  });

  test('empty ref', () => {
    useRef.mockReturnValue({
      current: null,
    });
    const { result } = renderHook(() => useOption());

    expect(result.current.isLabelTruncate).toEqual(false);
  });
});
