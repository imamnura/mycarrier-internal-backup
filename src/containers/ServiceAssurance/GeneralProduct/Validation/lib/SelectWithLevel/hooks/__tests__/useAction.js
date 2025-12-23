import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActions from '../useAction';

describe('src/containers/ServiceAssurance/GeneralProduct/Validation/lib/SelectWithLevel/hooks/useActions', () => {
  afterEach(cleanup);

  test('run properly', async () => {
    const props = {
      value: 'content',
      onChange: () => jest.fn(),
      data: [
        {
          content: 'content',
        },
      ],
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setOpen(true)();
      await result.current.onChange({ target: { value: 'value' } });
      await result.current.handleValue({})();

      res = await result;
    });

    await expect(res.current.open).toBeTruthy();
  });

  test('run properly no selected', async () => {
    const props = {
      onChange: () => jest.fn(),
      data: [
        {
          content: 'content',
        },
      ],
    };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActions(props));

      await result.current.setOpen(true)();
      await result.current.onChange({ target: { value: 'value' } });
      await result.current.handleValue({})();

      res = await result;
    });

    await expect(res.current.open).toBeTruthy();
  });
});
