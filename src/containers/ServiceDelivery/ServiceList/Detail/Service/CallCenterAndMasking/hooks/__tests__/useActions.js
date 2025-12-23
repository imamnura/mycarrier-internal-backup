import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import { useRouter } from 'next/router';
import { getDetailProduct } from '../../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

jest.mock('../../../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ServiceDelivery/ServiceList/Detail/CallCenterAndMasking/hooks/useActions', () => {
  afterEach(cleanup);

  const resolvedDetail = {
    data: {
      overallProgress: [
        {
          title: 'Review Order',
          variant: 'disabled',
          time: '',
        },
        {
          title: 'Site Survey',
          variant: 'disabled',
          time: '',
        },
        {
          title: 'Allocate',
          variant: 'disabled',
          time: '',
        },
        {
          title: 'Validate',
          variant: 'disabled',
          time: '',
        },
        {
          title: 'Activate',
          variant: 'disabled',
          time: '',
        },
        {
          title: 'Ready to Test',
          variant: 'disabled',
          time: '',
        },
        {
          title: 'Activation Letter Started',
          variant: 'success',
          time: '2023-04-03T04:57:04.243Z',
        },
      ],
    },
  };

  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    getDetailProduct.mockResolvedValue(resolvedDetail);
    useRouter.mockReturnValue({
      query: { id: '123', params: '123', serviceType: 'call-center' },
      push: jest.fn(),
    });
  });

  const props = { feature: ['read_detail_service_list'] };

  test('run properly', async () => {
    let res;
    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );
      await waitForValueToChange(() => result.current.detailProduct);
      res = await result;
    });

    await expect(res.current.detailProduct).toBeTruthy();
  });

  test('run properly reject', async () => {
    getDetailProduct.mockResolvedValue({
      data: {
        overallProgress: [
          {
            title: 'Review Order',
            variant: 'disabled',
            time: '',
          },
          {
            title: 'Site Survey',
            variant: 'disabled',
            time: '',
          },
          {
            title: 'Allocate',
            variant: 'disabled',
            time: '',
          },
          {
            title: 'Validate',
            variant: 'disabled',
            time: '',
          },
          {
            title: 'Activate',
            variant: 'disabled',
            time: '',
          },
          {
            title: 'Ready to Test',
            variant: 'disabled',
            time: '',
          },
          {
            title: 'Activation Letter Started',
            variant: 'reject',
            time: '2023-04-03T04:57:04.243Z',
          },
        ],
      },
    });
    let res;
    await act(async () => {
      const { result, waitForValueToChange } = await renderHook(() =>
        useActions(props),
      );
      await waitForValueToChange(() => result.current.detailProduct);
      res = await result;
    });

    await expect(res.current.detailProduct).toBeTruthy();
  });

  test('empty privilege', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions({ feature: [] }));
      res = await result;
    });

    await expect(res.current.detailProduct).toBeNull();
  });

  test('failed get detail', async () => {
    getDetailProduct.mockRejectedValueOnce({ message: 'e' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.detailProduct).toBeNull();
  });

  test('empty id', async () => {
    useRouter.mockReturnValue({
      query: { id: null, params: null, serviceType: null },
    });

    const { result } = await renderHook(() => useActions(props));

    await expect(result.current.detailProduct).toBeNull();
  });
});
