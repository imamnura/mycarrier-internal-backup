import { act, renderHook, cleanup } from '@testing-library/react-hooks';
import { useSnackbar } from 'notistack';
import useAction from '../useAction';

jest.mock('notistack');

describe('src/component/Form/Otp/hooks/useAction', () => {
  beforeEach(() => {
    useSnackbar.mockReturnValue({
      enqueueSnackbar: jest.fn(),
    });
    jest.useFakeTimers();
  });

  afterAll(cleanup);

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          repository: {
            send: jest.fn(),
            reSend: jest.fn(),
          },
          id: '1',
          onSubmit: jest.fn(),
          open: true,
        }),
      );

      await result.current.reSendOTP();

      res = result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run error', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          repository: {
            send: jest.fn().mockRejectedValue({ message: 'error' }),
            reSend: jest.fn(),
          },
          id: '1',
          onSubmit: jest.fn(),
          open: true,
        }),
      );

      res = result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run localstorage timer', async () => {
    let res;

    Storage.prototype.getItem = jest
      .fn()
      .mockReturnValue(JSON.stringify({ 1: 22 }));

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          repository: {
            send: jest.fn(),
            reSend: jest.fn(),
          },
          id: '1',
          onSubmit: jest.fn(),
          open: true,
        }),
      );

      res = result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run state timer', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useAction({
          repository: {
            send: jest.fn(),
            reSend: jest.fn(),
          },
          id: 'mock',
          onSubmit: jest.fn(),
          open: true,
        }),
      );

      await jest.runAllTimers();

      res = result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
