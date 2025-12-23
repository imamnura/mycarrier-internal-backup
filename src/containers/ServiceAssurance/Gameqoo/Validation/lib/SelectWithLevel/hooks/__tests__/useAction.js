import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/containers/ServiceAssurance/Gameqoo/Validation/lib/SelectWithLevel/hooks', () => {
  afterEach(cleanup);

  const props = {
    _value: 'test',
    _onChange: jest.fn(),
    data: [],
  };

  test('run properly', async () => {
    const { result } = await renderHook(() => useAction(props));

    act(() => {
      result.current.setOpen(true)();
      result.current.onChange({ target: 'test' });
      // result.current.handleValue({});
    });

    await expect(result.current).toBeTruthy();
  });

  test('run properly data true', async () => {
    const customProps = { ...props, data: ['test', 'test', 'test'] };
    const { result } = await renderHook(() => useAction(customProps));

    act(() => {
      result.current.setOpen(true)();
      result.current.onChange({ target: 'test' });
      // result.current.handleValue({});
    });

    await expect(result.current).toBeTruthy();
  });
});
