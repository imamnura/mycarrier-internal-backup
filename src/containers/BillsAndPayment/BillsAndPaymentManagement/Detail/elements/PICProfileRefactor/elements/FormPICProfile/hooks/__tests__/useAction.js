import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  postPicProfile,
  getListCustomer,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/PICProfile/elements/FormPICProfile/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({ query: { id: 'bpNumber' }, push: jest.fn() });
    usePopupAlert.mockReturnValue({
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
  });

  const props = {
    allProfile: [],
    formPic: {
      open: true,
      variant: 'add',
    },
    onClose: jest.fn(),
    type: 'customer',
    updatePicProfile: jest.fn(),
  };

  test('run properly', async () => {
    postPicProfile.mockResolvedValue({
      data: {},
    });
    getListCustomer.mockResolvedValue({
      data: [{}],
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit();
      await result.current.fetchSubmitPic({})();
      await result.current.customerAsyncProps.loadOptions('', {}, { page: 1 });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run fail', async () => {
    postPicProfile.mockRejectedValue({
      data: {},
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.fetchSubmitPic({})();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
