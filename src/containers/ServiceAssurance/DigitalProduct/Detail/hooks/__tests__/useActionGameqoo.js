import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActionGameqoo from '../useActionGameqoo';

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/hooks/useActionGameqoo', () => {
  afterEach(cleanup);

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActionGameqoo());

      await result.current.onClickModalReturn();
      await result.current.onClickValidation();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });
});
