import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useActions';

describe('src/containers/ContentManagement/Events/Add-v2/lib/sections/EventBanner/hooks/useActions', () => {
  afterEach(cleanup);

  const props = {
    useForm: { _setValue: jest.fn(), _watch: jest.fn() },
    tab: 'id',
  };

  test('render tab id', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      await result.current.handleUploadImage({ mediaId: 'test' });
      await result.current.setFile({ mediaId: 'test' });
      await result.current.handleEditableDesc('test');
      res = await result;
    });
    await expect(res.current.descriptionid).toBeTruthy();
  });

  test('render tab en', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useActions({ ...props, tab: 'en' }),
      );
      await result.current.handleUploadImage({ mediaId: 'test' });
      await result.current.setFile({ mediaId: 'test' });
      await result.current.handleEditableDesc('test');
      res = await result;
    });
    await expect(res.current.descriptionen).toBeTruthy();
  });

  test('render handleEditableDesc null tab id', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));
      await result.current.handleEditableDesc('');
      res = await result;
    });
    await expect(res.current.descriptionid).toBeTruthy();
  });

  test('render handleEditableDesc null tab en', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() =>
        useActions({ ...props, tab: 'en' }),
      );
      await result.current.handleEditableDesc('');
      res = await result;
    });
    await expect(res.current.descriptionen).toBeTruthy();
  });
});
