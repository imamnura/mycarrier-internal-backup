import { getOptionPickProduct } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';

jest.mock(
  '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories',
);

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUp/elements/Product/elements/PickProduct/hooks/useAction', () => {
  afterEach(cleanup);

  const props = {
    value: {},
    onSubmit: jest.fn(),
  };

  test('run properly', async () => {
    getOptionPickProduct.mockResolvedValue({
      data: [{}],
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit();
      await result.current.setOpen(true)();

      res = await result;
    });

    await expect(res.current.optionProduct).toBeTruthy();
  });

  test('run failed fetch', async () => {
    getOptionPickProduct.mockRejectedValue({
      data: [{}],
    });
    let res;

    await act(async () => {
      const { result } = await renderHook(() => useAction(props));

      await result.current.onSubmit();
      await result.current.setOpen(true)();

      res = await result;
    });

    await expect(res.current.optionProduct).toBeTruthy();
  });
});
