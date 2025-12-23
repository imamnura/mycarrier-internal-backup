import { act, renderHook, cleanup } from '@testing-library/react-hooks';
import moment from 'moment';
import { useRef } from 'react';
import useAction from '../useAction';

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();

  return {
    ...originReact,
    useRef: mUseRef,
  };
});

describe('src/component/TimePickerForm/elements/Secondary/hooks/useAction', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-10-10'));
  });

  afterAll(() => {
    cleanup();
    moment.suppressDeprecationWarnings = false;
  });

  test('run default', async () => {
    const { result } = await renderHook(() =>
      useAction({
        onChange: jest.fn(),
        value: null,
      }),
    );

    expect(result.current.activeHour).toEqual(0);
  });

  test('with min and max', async () => {
    const minTime = moment('00:00:00', 'HH:mm:ss');
    const maxTime = moment('23:59:59', 'HH:mm:ss');

    useRef.mockReturnValue({ current: { scrollTo: jest.fn() } });

    const { result } = await renderHook(() =>
      useAction({
        maxTime: maxTime.toJSON(),
        minTime: minTime.toJSON(),
        onChange: jest.fn(),
        value: minTime.toJSON(),
      }),
    );

    await act(async () => {
      await result.current.onPickTime(0, 'hour')();
      await result.current.onPickTime(1, 'hour')();
      await result.current.separatorHandler('hour')({
        currentTarget: { scrollTop: 32 },
      });
      await result.current.separatorHandler('hour')({
        currentTarget: { scrollTop: 0 },
      });
      await result.current.separatorHandler('hour')({
        currentTarget: { scrollTop: 0 },
      });
    });

    expect(result.current.activeHour).toEqual(1);
  });

  test('with min & value invalid', async () => {
    const minTime = moment('08:00:00', 'HH:mm:ss');
    useRef.mockReturnValue({ current: { scrollTo: jest.fn() } });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          minTime: minTime.toJSON(),
          onChange: jest.fn(),
          value: moment('06:00:00', 'HH:mm:ss').toJSON(),
        }),
      );

      result.current.setOpen(true)();
      result.current.setOpen(false)();

      res = result;
    });

    await expect(res.current.activeHour).toEqual(
      parseInt(minTime.format('HH')),
    );
  });

  test('with max & value invalid', async () => {
    const maxTime = moment('08:00:00', 'HH:mm:ss');
    useRef.mockReturnValue({ current: { scrollTo: jest.fn() } });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          maxTime: maxTime.toJSON(),
          onChange: jest.fn(),
          value: moment('09:11:00', 'HH:mm:ss').toJSON(),
        }),
      );

      res = result;
    });

    await expect(res.current.activeHour).toEqual(
      parseInt(maxTime.format('HH')),
    );
  });

  test('with invalid min and max', async () => {
    moment.suppressDeprecationWarnings = true;
    const { result } = await renderHook(() =>
      useAction({
        maxTime: '20/20/2020',
        minTime: '20/20/2020',
        onChange: jest.fn(),
        value: null,
        open: true,
      }),
    );

    expect(result.current.isMaxDateInvalid(10, 'hour')).toBeFalsy();
  });

  test('with invalid max', async () => {
    const maxTime = moment('10/10/2001 10:10:10', 'DD/MM/YYYY HH:mm:ss');
    const { result } = await renderHook(() =>
      useAction({
        maxTime: '20/20/2020',
        onChange: jest.fn(),
        value: maxTime.toJSON(),
        open: true,
      }),
    );

    expect(result.current.activeHour).toBeFalsy();
  });
});
