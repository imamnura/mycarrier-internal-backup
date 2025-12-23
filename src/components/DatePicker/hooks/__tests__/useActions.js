import { renderHook, act } from '@testing-library/react-hooks';
import useActions from '../useActions';
import moment from 'moment';

jest.mock('../../../../utils/hooks/useResponsive');

describe('src/components/DatePicker/hooks/useActions', () => {
  test('empty', () => {
    const props = {
      mobileClient: false,
      value: null,
      onChange: jest.fn(),
    };
    const { result } = renderHook(() => useActions(props));

    expect(result.current.selectedDate).toEqual(null);
  });

  test('run properly', () => {
    const props = {
      mobileClient: false,
      value: null,
      onChange: jest.fn(),
      views: undefined,
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.resetSelectedDate();
      result.current.onClosePopup();
    });

    expect(result.current.selectedDate).toEqual(props.value);
  });

  test('setSelectedDate', async () => {
    const date = moment();
    const props = {
      mobileClient: false,
      value: date,
      onChange: jest.fn(),
    };
    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      await result.current.setSelectedDate(date);
      await result.current.onSubmit();
    });

    expect(result.current.selectedDate).toEqual(date);
  });

  test('setSelectedDate autoOk', async () => {
    const date = moment();
    const props = {
      autoOk: true,
      mobileClient: false,
      value: date,
      onChange: jest.fn(),
    };
    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      await result.current.setSelectedDate(date);
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  test('setOpen', () => {
    const date = [moment(), moment()];
    const props = {
      mobileClient: false,
      value: date,
      onChange: jest.fn(),
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.setOpen(date)({ currentTarget: {} });
    });

    expect(result.current.open).toBeTruthy();
  });

  test('setOpen mobile', () => {
    const date = moment();
    const props = {
      mobileClient: true,
      value: date,
      onChange: jest.fn(),
    };
    const { result } = renderHook(() => useActions(props));

    act(() => {
      result.current.setOpen(date)({ currentTarget: {} });
    });

    expect(result.current.open).toBeTruthy();
  });

  test('views & selectedDate empty', () => {
    const props = {
      mobileClient: false,
      value: null,
      onChange: jest.fn(),
      views: ['month'],
    };
    const { result } = renderHook(() => useActions(props));

    expect(result.current.selectedDate).toBeTruthy();
  });
});
