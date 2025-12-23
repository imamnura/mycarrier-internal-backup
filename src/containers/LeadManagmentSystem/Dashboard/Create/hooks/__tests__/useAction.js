import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useAction';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getListCompany,
  getOptionsProduct,
  getSource,
  postCreateLead,
  getListContact,
} from '../../../_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('../../../_repositories/repositories');
jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/LeadManagementSystem/Dashbaord/Create/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
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
      replace: jest.fn(),
    });
  });

  const props = {
    control: {},
    handleSubmit: jest.fn(),
    feature: [],
  };

  test('run properly', async () => {
    getListCompany.mockResolvedValue({ data: [{}] });
    getListContact.mockResolvedValue({ data: [{}] });
    getOptionsProduct.mockResolvedValue({
      data: [{ productId: 1, productName: 'a' }],
    });
    getSource.mockResolvedValue({ data: [{ name: 'a' }] });
    postCreateLead.mockResolvedValue({ data: [] });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.onSubmit({ product: { data: 'test' } });
      await result.current.onSubmit({ isOtherCustomer: true });
      await result.current.onSubmit({
        isOtherCustomer: false,
        validBy: 'dispatchMyTens',
      });
      await result.current.onSubmit({
        validBy: 'amMapping',
        amMapping: [{ nik: '1' }],
      });
      await result.current.fetchOptionCompany('', [], { page: 1 });
      await result.current.fetchOptionContact('', [], { page: 1 });
      // await result.current.fetchOptionCompany(0);
      await result.current.fetchSubmitLead({})();
      await result.current.onSuccessSubmit();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run properly initialValidBy: sendEmail', async () => {
    getListCompany.mockResolvedValue({ data: [{}] });
    getOptionsProduct.mockResolvedValue({ data: [{ catId: '1' }] });
    getSource.mockResolvedValue({ data: [{ name: 'a' }] });
    postCreateLead.mockResolvedValue({ data: [] });

    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useActions({ ...props, initialValidBy: 'sendEmail' }),
      );

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('failed fetch', async () => {
    getListCompany.mockRejectedValue({ message: '' });
    getOptionsProduct.mockRejectedValue({ message: '' });
    getSource.mockRejectedValue({ message: '' });
    postCreateLead.mockRejectedValue({ message: '' });
    getListContact.mockRejectedValue({ message: '' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchSubmitLead({})();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
