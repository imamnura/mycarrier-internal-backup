import { renderHook, act } from '@testing-library/react-hooks';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getOptionForm,
  downloadReport,
} from '@containers/ServiceDelivery/IPPrefix/_repositories/repositories';

jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/usePopupConfirmation');
jest.mock('@containers/ServiceDelivery/IPPrefix/_repositories/repositories');

const props = {
  open: true,
  setOpen: jest.fn(),
};

describe('src/containers/ServiceDelivery/IPPrefix/lib/DownloadForm', () => {
  beforeEach(() => {
    usePopupAlert.mockReturnValue({
      setSuccessAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setFailedAlert: jest.fn(),
    });

    usePopupConfirmation.mockReturnValue({
      setConfirmation: jest.fn(),
      closeConfirmation: jest.fn(),
    });

    jest.useFakeTimers();
  });

  test('run properly', async () => {
    getOptionForm.mockResolvedValue({ data: ['test'] });
    downloadReport.mockResolvedValue({ data: { fileName: '', fileUrl: '' } });

    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.onClose();
      result.current.handleDownload({
        dateRange: ['YYYY-MM-DD', 'YYYY-MM-DD'],
      });
    });

    await expect(result.current.control).toBeTruthy();
  });

  test('run properly other props', async () => {
    getOptionForm.mockResolvedValue({ data: ['test'] });
    downloadReport.mockResolvedValue({ data: { fileName: '', fileUrl: '' } });

    const otherProps = {
      ...props,
      open: false,
    };

    const { result } = await renderHook(() => useActions({ ...otherProps }));

    await act(async () => {
      result.current.onClose();
      result.current.handleDownload();
    });

    await expect(result.current.control).toBeTruthy();
  });

  test('fetch error', async () => {
    getOptionForm.mockRejectedValue({ message: '' });
    downloadReport.mockRejectedValue({ message: '' });

    const { result } = await renderHook(() => useActions({ ...props }));

    await act(async () => {
      result.current.handleDownload();
    });

    await expect(result.current.control).toBeTruthy();
  });
});
