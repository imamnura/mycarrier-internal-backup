import { renderHook, act } from '@testing-library/react-hooks';
import {
  addCompany,
  getCompanyList,
} from '../../../../../_repositories/repositories';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('../../../../../_repositories/repositories');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');

const props = {
  fetchDetail: jest.fn(),
  clearConfirmation: jest.fn(),
  setModalAddCompany: jest.fn(),
  id: 'test',
  setConfirm: jest.fn(),
};

describe('src/pages/Document/ReportNeucentrix/Detail/forms/AddCompanyName/hooks/useActions', () => {
  beforeEach(() => {
    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });
  });
  test('run properly', async () => {
    usePopupAlert.mockReturnValue({ setSuccessAlert: jest.fn() });
    addCompany.mockResolvedValue({ data: {} });
    getCompanyList.mockResolvedValue({
      data: [{ custAcctnName: 'test', nipnas: '318769' }],
    });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      await result.current.fetchAllCompany();
      await result.current.fetchAddCompany('test', { companyName: 'test' });
      result.current.handleAddCompany();
      result.current.onClose();
    });

    expect(result.current.fetchAllCompany).not.toBeUndefined();
    expect(result.current.fetchAddCompany).not.toBeUndefined();
  });

  test('submit invalid company name', async () => {
    usePopupAlert.mockReturnValue({ setSuccessAlert: jest.fn() });
    addCompany.mockResolvedValue({ data: {} });
    getCompanyList.mockResolvedValue({
      data: [{ custAcctnName: 'test invalid' }],
    });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      await result.current.fetchAddCompany('test', { companyName: 'test' });
    });

    expect(result.current.fetchAddCompany).not.toBeUndefined();
  });

  test('fetch rejected', async () => {
    usePopupAlert.mockReturnValue({ setFailedAlert: jest.fn() });
    addCompany.mockRejectedValue({ message: 'error' });
    getCompanyList.mockRejectedValue({ message: 'error' });

    const { result } = renderHook(() => useActions(props));

    await act(async () => {
      await result.current.fetchAllCompany();
      await result.current.fetchAddCompany('test', { companyName: 'test' });
    });

    expect(result.current.fetchAllCompany).not.toBeUndefined();
    expect(result.current.fetchAddCompany).not.toBeUndefined();
  });
});
