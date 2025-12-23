import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useDetail from '../useDetail';
import { useRouter } from 'next/router';
import { getDetail } from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';

jest.mock(
  '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories',
);
jest.mock('@utils/hooks/useDocumentViewer');
jest.mock('next/router');

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/hooks/useDetail', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'referenceId' },
      push: jest.fn(),
    });
    useDocumentViewer.mockReturnValue({
      setDocumentViewer: jest.fn(),
    });
  });

  test('run properly', async () => {
    getDetail.mockResolvedValue({ data: {} });

    const jsdomOpen = window.open;
    window.open = () => {};
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useDetail());

      await result.current.fetchDetail();
      await result.current.onPreviewWorklog({
        fileName: 'name',
        fileUrl: 'url-to-file.pdf',
      })();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
    window.open = jsdomOpen;
  });

  test('run properly failed', async () => {
    getDetail.mockRejectedValue();

    const jsdomOpen = window.open;
    window.open = () => {};
    let res;
    await act(async () => {
      const { result } = await renderHook(() => useDetail());

      await result.current.fetchDetail();
      await result.current.onPreviewWorklog({ fileName: '', fileUrl: '' })();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
    window.open = jsdomOpen;
  });
});
