import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useAction';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { deletePicProfile } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock(
  '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories',
);

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/elements/PICProfileRefactor/hooks/useActions', () => {
  afterEach(cleanup);

  const props = {
    updatePicProfile: jest.fn(),
    type: 'cdm',
  };

  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
    useRouter.mockReturnValue({ query: { id: 'BP-123' }, push: jest.fn() });
  });

  test('run properly', async () => {
    deletePicProfile.mockResolvedValue({ data: {} });
    const { result } = await renderHook(() => useActions(props));

    act(() => {
      result.current.setFormPic({ variant: 'tes', defaultValues: {} })();
      result.current.closeFormPic();
      result.current.deleteProfile('email')();
      result.current.fetchDeleteProfile('email')();
    });

    expect(result.current.formPic).toBeTruthy();
  });

  test('run fail fetch', async () => {
    deletePicProfile.mockRejectedValue({ data: {} });
    const { result } = await renderHook(() => useActions(props));

    act(() => {
      result.current.fetchDeleteProfile('email')();
    });

    expect(result.current.formPic).toBeTruthy();
  });
});
