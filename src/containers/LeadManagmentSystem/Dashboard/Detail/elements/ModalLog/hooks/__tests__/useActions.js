import { renderHook, act } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/pages/LeadManagementSystem/Dashboard/DetailPhase2/elements/PickUpProductItems/hooks/useAction', () => {
  const props = {
    open: true,
    onClose: jest.fn(),
  };

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      res = await result;
    });

    await expect(res.current.tab).toBeTruthy();
  });
});
