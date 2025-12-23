import { renderHook, act } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/pages/BillsAndPayment/Settlement/Detail/Users/elements/VirtualMachine/hooks/useAction', () => {
  test('run properly', async () => {
    const { result } = await renderHook(() => useAction({ data: [{ id: 1 }] }));

    act(() => {
      result.current.setSearch('-');
      result.current.onPaginationChange('', 1);
    });

    await expect(result.current.data).toHaveLength(1);
  });
});
