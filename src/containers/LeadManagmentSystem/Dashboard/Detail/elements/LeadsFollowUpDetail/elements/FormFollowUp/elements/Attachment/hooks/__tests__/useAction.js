import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUp/elements/Attachment/hooks/useAction', () => {
  afterEach(cleanup);

  const props = {
    defaultValues: {},
    onSubmit: jest.fn(),
  };

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit({ type: 'test' });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
