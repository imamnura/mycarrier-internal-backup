import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/RetireForm/hooks/useAction', () => {
  afterEach(cleanup);

  const props = {
    feature: [],
    onSubmit: jest.fn(),
  };

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
