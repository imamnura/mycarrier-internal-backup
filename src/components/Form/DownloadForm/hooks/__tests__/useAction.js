import { renderHook, act } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/components/Form/DownloadForm/hooks/useAction', () => {
  const props = {
    onSubmit: jest.fn(),
  };

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit();

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
