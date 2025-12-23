import { renderHook, act, cleanup } from '@testing-library/react-hooks/server';
import { route } from '@configs';
import {
  getList,
  deleteProduct,
} from '@containers/ContentManagement/Product/_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@containers/ContentManagement/Product/_repositories/repositories');
jest.mock('react-redux');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ContentManagement/Product/List-v2/hooks/useActions', () => {
  afterEach(() => {
    cleanup();
  });
  const E = { stopPropagation: jest.fn() };

  test('run properly', async () => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.productManage('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });
    deleteProduct.mockResolvedValue({ success: true });

    const props = { feature: [''], initialChooseContent: 0 };

    const { hydrate, result, waitForNextUpdate } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForNextUpdate();

    act(() => {
      result.current.onAddProduct();
      result.current.onDeleteProduct(E);
      result.current.onUpdateProduct(E);
      result.current.addProduct(true); //product v2
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly/others states', async () => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.productManage('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 5 },
    });
    deleteProduct.mockResolvedValue({ success: true });

    const props = {
      feature: ['create_product', 'update_product', 'delete_product'],
      initialChooseContent: 1,
    };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    act(() => {
      result.current.onAddProduct();
      result.current.onDeleteProduct(E);
      result.current.onUpdateProduct(E);
      // result.current.onBottomPage();
      result.current.fetchDeleteProduct(1)();
      result.current.onCloseDialog(); //product v2
      result.current.onClickRowTable({ catId: 1 }); //product v2
      result.current.setOpenDialog(true); //product v2
      result.current.addProduct(true); //product v2
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('run properly chooseContent 2', async () => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.productManage('list'),
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: [{}],
      meta: { totalPages: 2, page: 1 },
    });
    deleteProduct.mockResolvedValue({ success: true });

    const props = { feature: [''], initialChooseContent: 2 };

    const { result } = await renderHook(() => useActions(props));

    act(() => {
      result.current.addProduct(true); //product v2
    });

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('wrong route', async () => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: '/wrong-route',
      push: jest.fn(),
    });
    getList.mockResolvedValue({
      data: null,
      meta: { totalPages: 2, page: 4 },
    });
    deleteProduct.mockResolvedValue({ success: true });

    const props = { feature: [''] };

    const { result, hydrate } = await renderHook(() => useActions(props));

    hydrate();

    expect(result.current.list.data).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    useRouter.mockReturnValue({
      pathname: route.productManage('list'),
      push: jest.fn(),
    });

    getList.mockRejectedValue({ message: '' });
    deleteProduct.mockRejectedValue({ success: false });

    const props = { feature: ['delete_product'] };

    const { result, hydrate, waitForValueToChange } = await renderHook(() =>
      useActions(props),
    );

    hydrate();

    await waitForValueToChange(() => result.current.list.data);

    expect(result.current.list.data).not.toBeUndefined();
  });
});
