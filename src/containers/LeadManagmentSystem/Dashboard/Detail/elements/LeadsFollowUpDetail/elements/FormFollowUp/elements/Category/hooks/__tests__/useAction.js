import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUp/elements/Category/hooks/useAction', () => {
  afterEach(cleanup);

  const props = {
    open: true,
    onSubmit: jest.fn(),
  };

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit();

      res = await result;
    });

    await expect(res.current.open).toBeTruthy();
  });
});
