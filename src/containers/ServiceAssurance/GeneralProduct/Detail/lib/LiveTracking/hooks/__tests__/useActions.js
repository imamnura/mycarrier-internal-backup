import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useGpsTracking from '@utils/gps-tracking';
import useActions from '../useActions';
import { logTracking } from '@containers/ServiceAssurance/GeneralProduct/_repositories/repositories';

jest.mock(
  '@containers/ServiceAssurance/GeneralProduct/_repositories/repositories',
);
jest.mock('@utils/gps-tracking');

jest.useFakeTimers();

describe('src/containers/ServiceAssurance/GeneralProduct/Detail/lib/LiveTracking/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useGpsTracking.mockReturnValue({
      trackingData: {},
      startTracking: jest.fn(),
      stopTracking: jest.fn(),
    });
  });

  const props = {
    setModalLiveTracking: jest.fn(),
    modalLiveTracking: false,
    id: '123',
  };

  test('run properly', async () => {
    logTracking.mockResolvedValue({ message: 'success' });
    // let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClose();

      jest.advanceTimersByTime(300);

      // res = await result;
    });

    await expect(props.setModalLiveTracking).toHaveBeenCalled();
  });

  test('run properly full props', async () => {
    useGpsTracking.mockReturnValueOnce({
      trackingData: { latitude: 1 },
      startTracking: jest.fn(),
      stopTracking: jest.fn(),
    });
    logTracking.mockResolvedValue({ message: 'success' });
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useActions({ ...props, modalLiveTracking: true }),
      );

      await result.current.onClose();

      res = await result;
    });

    await expect(res.current.trackingData).toMatchObject({});
  });

  test('run fail fetch', async () => {
    logTracking.mockRejectedValue({ message: 'failed' });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onClose();

      res = await result;
    });

    await expect(res.current.trackingData).toMatchObject({});
  });
});
