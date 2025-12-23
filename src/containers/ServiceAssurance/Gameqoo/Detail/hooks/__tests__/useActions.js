import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { getDetail } from '@containers/ServiceAssurance/Gameqoo/_repositories/repositories';
import { priviledge } from '../../utils';
import useActions from '../useActions';

jest.mock('next/router');
jest.mock('@utils/hooks/usePopupAlert');
jest.mock('@utils/hooks/useDocumentViewer');
jest.mock('@containers/ServiceAssurance/Gameqoo/_repositories/repositories');
jest.mock('../../utils');

describe('src/containers/ServiceAssurance/Gameqoo/Detail/hooks/useActions', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'referenceId' },
      push: jest.fn(),
    });
    usePopupAlert.mockReturnValue({
      setFailedAlert: jest.fn(),
    });
    useDocumentViewer.mockReturnValue({
      setDocumentViewer: jest.fn(),
    });
    priviledge.mockReturnValue({
      canDetail: false,
      canDetailHistory: true,
    });
  });

  const props = { feature: [] };

  test('run properly', async () => {
    getDetail.mockResolvedValue({ data: { historyWorklog: [] } });

    const jsdomOpen = window.open;
    window.open = () => {};
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail('referenceId')();
      await result.current.onClickModalReturn()();
      await result.current.onClickValidation()();
      await result.current.onPreviewWorklog({
        fileName: 'name',
        fileUrl: '',
      })();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
    window.open = jsdomOpen;
  });

  test('run properly without id', async () => {
    useRouter.mockReturnValueOnce({ query: { id: '' }, push: jest.fn() });
    getDetail.mockResolvedValue({ data: { historyWorklog: [] } });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail('')();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly with priviledge', async () => {
    priviledge.mockReturnValueOnce({
      canDetail: false,
      canDetailHistory: false,
    });
    getDetail.mockResolvedValue({ data: { historyWorklog: [] } });

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail('')();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });

  test('run properly with preview worklog', async () => {
    getDetail.mockResolvedValue({ data: { historyWorklog: [] } });

    const jsdomOpen = window.open;
    window.open = () => {};
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.fetchDetail('referenceId')();
      await result.current.onPreviewWorklog({
        fileName: 'file name',
        fileUrl: 'url-to-file.pdf',
      })();
      await result.current.onPreviewWorklog({
        fileName: '',
        fileUrl: 'url-to-file.pdf',
      })();

      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
    window.open = jsdomOpen;
  });

  test('run fail fetch detail', async () => {
    getDetail.mockRejectedValue({ message: '' });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      res = await result;
    });

    await expect(res.current.data).toBeTruthy();
  });
});
