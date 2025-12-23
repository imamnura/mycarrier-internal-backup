import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';
import useActions from '../useAction';
import { useRouter } from 'next/router';
import { getDetailIsolate } from '@containers/BillsAndPayment/Isolate/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('@containers/BillsAndPayment/Isolate/_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/Broadcast/BroadcastInformation/Detail/hooks/useActions', () => {
  afterEach(cleanup);

  const resolvedDetail = {
    data: {
      id: '634e2ea9bd93f000eb986c85',
      am: null,
      sid: '1706658412',
      product: 'Metro E',
      customerName: 'TEST API MYCARRIER',
      isolateBy: null,
      isolateDate: '2022-09-02 00:00:00',
      submitDate: '2022-10-18T04:42:17.768Z',
      address:
        ' Jl. C. Simanjuntak, Terban, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa , KOTA YOGYAKARTA,0',
      regional: 'REGION 4',
      receipt: [],
    },
  };

  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    getDetailIsolate.mockResolvedValue(resolvedDetail);
    useRouter.mockReturnValue({
      asPath: route.isolate('detail', 'id'),
      push: jest.fn(),
      query: { id: 'id' },
    });
  });

  const feature = ['read_detail_isolate_cdm'];

  test('run properly', async () => {
    const props = { feature };

    let res;

    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );

      await waitForValueToChange(() => result.current.data);
      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('empty privilege', async () => {
    const props = { feature: [] };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      res = await result;
    });

    await expect(res.current.data).toBeNull();
  });

  test('failed get detail', async () => {
    getDetailIsolate.mockRejectedValueOnce();

    const props = { feature };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.data).toBeNull();
  });

  test('empty id', async () => {
    useRouter.mockReturnValue({
      asPath: route.isolate('detail', 'id'),
      push: jest.fn(),
      query: { id: '' },
    });
    const props = { feature };

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.data).toBeNull();
  });
});
