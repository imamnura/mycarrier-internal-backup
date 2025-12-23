import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getListBaso,
  getFilterCustomerOptions,
  getFilterAmOptions,
  getFilterSegmentOptions,
  getFilterProductOptions,
} from '../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

jest.mock('../../../_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');

const props = { feature: ['read_detail'] };

describe('src/pages/Document/Baso/List/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });

  test('run properly', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.baso('list'),
      push: jest.fn(),
    });
    getListBaso.mockResolvedValue({
      data: [{}],
      meta: { totalPage: 2, page: 1 },
    });
    getFilterCustomerOptions.mockResolvedValue({
      data: [{ custAccntNum: 'test', custAccntName: 'test' }],
    });
    getFilterAmOptions.mockResolvedValue({
      data: [{ fullName: 'test', nik: 'test' }],
    });
    getFilterProductOptions.mockResolvedValue({
      data: [{ productId: 'test', productName: 'test' }],
    });
    getFilterSegmentOptions.mockResolvedValue({
      data: [{ id: 'test', name: 'test' }],
    });

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickDocument('https://test');
      result.current.onClickRowTable('RP-123');
      // result.current.onBottomPage();
    });

    // await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run with no access to read detail', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({
      pathname: route.baso('list'),
      push: jest.fn(),
    });
    getListBaso.mockResolvedValue({
      data: [{}],
      meta: { totalPage: 2, page: 1 },
    });

    const props = { feature: [] };
    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onClickRowTable('RP-123');
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    useRouter.mockReturnValue({ pathname: route.baso('list') });
    getListBaso.mockRejectedValue({ messsage: 'error' });
    getFilterCustomerOptions.mockRejectedValue({ messsage: 'error' });
    getFilterAmOptions.mockRejectedValue({ messsage: 'error' });
    getFilterSegmentOptions.mockRejectedValue({ messsage: 'error' });
    getFilterProductOptions.mockRejectedValue({ messsage: 'error' });

    const { result, hydrate, waitForValueToChange } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });
});
