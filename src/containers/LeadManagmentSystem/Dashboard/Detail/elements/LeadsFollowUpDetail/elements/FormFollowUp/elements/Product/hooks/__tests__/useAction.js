import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUp/elements/Product/hooks/useAction', () => {
  afterEach(cleanup);

  const props = {
    defaultValues: { product: 'test' },
    onSubmit: jest.fn(),
    variant: 'edit',
    id: { scLineId: 1 },
  };

  test('run properly', async () => {
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit({
        product: { productId: 'test' },
        quantity: 1,
        autoQuote: 0,
      });

      res = await result;
    });

    await expect(res.current.control).toBeTruthy();
  });
});
