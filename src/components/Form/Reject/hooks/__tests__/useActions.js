import { renderHook } from '@testing-library/react-hooks';
import useActions from '../useActions';

describe('src/component/Form/Reject/hooks/useActions', () => {
  test('run properly', async () => {
    const { result } = await renderHook(() => useActions({}));
    expect(result.current.control).not.toBeUndefined();
  });
});
