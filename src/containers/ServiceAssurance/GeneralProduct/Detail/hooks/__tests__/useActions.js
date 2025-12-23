import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailGeneralProduct,
  getUrgency,
  getComplaint,
} from '@containers/ServiceAssurance/GeneralProduct/_repositories/repositories';
import { priviledge } from '../../utils';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock(
  '@containers/ServiceAssurance/GeneralProduct/_repositories/repositories',
);
jest.mock('../../utils');

describe('src/containers/ServiceAssurance/GeneralProduct/Detail/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'referenceId' },
      push: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
    });
    priviledge.mockReturnValue({
      canDetail: false,
      canDetailHistory: true,
    });
  });

  const props = { feature: [] };

  test('run properly', async () => {
    getDetailGeneralProduct.mockResolvedValue({ data: {} });
    getUrgency.mockResolvedValue({ data: [] });
    getComplaint.mockResolvedValue({ data: [] });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail('referenceId');
      await result.current.onClickValidation()();
      await result.current.onClickModalReturn()();
      await result.current.openModalLiveTracking()();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly without id', async () => {
    useRouter.mockReturnValueOnce({ query: { id: '' }, push: jest.fn() });
    getDetailGeneralProduct.mockResolvedValue({ data: {} });
    getUrgency.mockResolvedValue({ data: [] });
    getComplaint.mockResolvedValue({ data: [] });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail('');

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly without priviledge', async () => {
    priviledge.mockReturnValueOnce({
      canDetail: false,
      canDetailHistory: false,
    });
    getDetailGeneralProduct.mockResolvedValue({ data: {} });
    getUrgency.mockResolvedValue({ data: [] });
    getComplaint.mockResolvedValue({ data: [] });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail('referenceId');

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run fail fetch detail', async () => {
    getDetailGeneralProduct.mockRejectedValue({ message: '' });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.data).toMatchObject({});
  });

  test('run fail fetch complaint', async () => {
    getComplaint.mockRejectedValue({ message: '' });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.data).toMatchObject({});
  });

  test('run fail fetch urgency', async () => {
    getUrgency.mockRejectedValue({ message: '' });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.data).toMatchObject({});
  });
});
