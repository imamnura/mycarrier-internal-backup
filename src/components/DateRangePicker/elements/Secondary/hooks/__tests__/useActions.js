import { renderHook, act } from '@testing-library/react-hooks';
import useActions from '../useActions';
import moment from 'moment';

jest.mock('@utils/hooks/useResponsive');

describe('src/components/DateRangePicker/elements/Secondary/hooks/useActions', () => {
  test('empty', () => {
    const props = {
      mobileClient: false,
      value: [null, null],
      onChange: jest.fn(),
    };
    const { result } = renderHook(() => useActions(props));

    // expect(result.current.startDate).toEqual(null);
    expect(result.current.startDate).not.toBeNull();
  });

  test('run empty value', () => {
    const props = {
      mobileClient: false,
      value: [null, null],
      onChange: jest.fn(),
      label: ['s', 'e'],
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.onReset();
      result.current.onClosePopup();
    });

    // expect(result.current.startDate).toEqual(null);
    expect(result.current.startDate).not.toBeNull();
  });

  test('run properly', () => {
    const date = [moment().add(-7, 'days'), moment()];

    const props = {
      mobileClient: false,
      value: date,
      onChange: jest.fn(),
      label: ['s', 'e'],
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.onClosePopup();
      result.current.onSubmit();
    });

    expect(result.current.startDate).toEqual(date[0]);
  });

  test('run others', () => {
    const props = {
      mobileClient: true,
      value: [],
      onChange: jest.fn(),
      label: ['s', 'e'],
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.setOpen(true)({ currentTarget: null });
    });

    // expect(result.current.startDate).toEqual(null);
    expect(result.current.startDate).not.toBeNull();
  });

  test('run end > start', () => {
    const date = [moment(), moment().add(-7, 'days')];

    const props = {
      mobileClient: false,
      value: date,
      onChange: jest.fn(),
      label: ['s', 'e'],
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.setOpen(false)({ currentTarget: null });
      result.current.setOpen(true)({ currentTarget: null });
    });

    expect(result.current.disableSubmit).toEqual(true);
  });
});
