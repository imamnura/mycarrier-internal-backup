import { renderHook, act } from '@testing-library/react-hooks';
import useActions from '../useActions';
import moment from 'moment';

jest.mock('@utils/hooks/useResponsive');

describe('src/components/DateRangePicker/elements/Primary/hooks/useActions', () => {
  test('empty', () => {
    const props = {
      mobileClient: false,
      value: null,
      labelCustom: [null, null],
      onChange: jest.fn(),
    };
    const { result } = renderHook(() => useActions(props));

    expect(result.current.selectedDate).toEqual(null);
  });

  test('run properly', () => {
    const props = {
      mobileClient: false,
      value: [null, null],
      labelCustom: [null, null],
      onChange: jest.fn(),
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.resetSelectedDate();
      result.current.onClosePopup();
    });

    expect(result.current.selectedDate).toEqual(props.value);
  });

  test('setSuggestionSelectedDate', () => {
    const date = [moment().add(-7, 'days'), moment()];
    const label = ['test', 'test'];
    const props = {
      mobileClient: false,
      value: date,
      onChange: jest.fn(),
      labelCustom: label,
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.setSuggestionSelectedDate(date)();
      result.current.onSubmit();
    });

    expect(result.current.selectedDate).toEqual(date);
  });

  test('setSelectedDate & dateRangeEqual', async () => {
    const date = [moment(), null];
    const label = ['test', null];
    const props = {
      mobileClient: false,
      value: date,
      onChange: jest.fn(),
      labelCustom: label,
    };
    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      await result.current.dateRangeEqual(date);
      await result.current.setSelectedDate(date);
    });

    expect(result.current.selectedDate).toEqual([date[0], date[0]]);
  });

  test('setOpen', () => {
    const date = [moment(), moment()];
    const label = ['test', 'test'];
    const props = {
      mobileClient: false,
      value: date,
      onChange: jest.fn(),
      labelCustom: label,
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.setOpen(date)({ currentTarget: {} });
    });

    expect(result.current.open).toBeTruthy();
  });

  test('setOpen mobile', () => {
    const date = [moment(), moment()];
    const props = {
      mobileClient: true,
      value: date,
      onChange: jest.fn(),
      label: ['test', 'test'],
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.setOpen(date)({ currentTarget: {} });
    });

    expect(result.current.open).toBeTruthy();
  });
});
