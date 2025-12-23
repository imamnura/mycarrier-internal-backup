import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { downloadList } from '@containers/ContentManagement/InterestedList/_repositories/repositories';

jest.mock(
  '@containers/ContentManagement/InterestedList/_repositories/repositories',
);
jest.mock('@utils/hooks/usePopupAlert');

describe('src/containers/ContentManagement/Article/Create/hooks/useActions', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
      setLoadingAlert: jest.fn(),
      setSuccessAlert: jest.fn(),
    });
    downloadList.mockResolvedValue();
  });

  // const resolvedValue = {
  //   control: {},
  //   formState: {},
  //   handleDownload: jest.fn(),
  //   handleSubmit: jest.fn(),
  //   onClose: jest.fn(),
  // };

  const props = {
    feature: [''],
    setModalDownload: jest.fn(),
    setLoadingDownload: jest.fn(),
    onClose: jest.fn(),
  };

  test('run properly success without message', async () => {
    downloadList.mockResolvedValue({ success: false });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleDownload({ email: 'test@gmail.com' });
      await result.current.handleSubmit();
      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run properly success with message', async () => {
    downloadList.mockResolvedValue({ success: true, message: 'test' });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleDownload({ email: 'test@gmail.com' });
      await result.current.handleSubmit();
      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run properly failed', async () => {
    downloadList.mockRejectedValue({
      message: `Data Interested List unsuccessfully downloaded.`,
    });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleDownload({ email: 'test@gmail.com' });
      await result.current.handleSubmit();
      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });

  test('run properly failed no message', async () => {
    downloadList.mockRejectedValue({});

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.handleDownload({ email: 'test@gmail.com' });
      await result.current.handleSubmit();
      await result.current.onClose();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
