import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import useAction from '../useAction';

describe('src/containers/BillsAndPayment/Settlement/Detail/SettlementList/elements/EditNDE', () => {
  afterEach(cleanup);

  test('run properly', async () => {
    const props = {
      onClose: jest.fn(),
      open: false,
      template: null,
      onSubmit: jest.fn(),
    };

    const { result } = await renderHook(() => useAction(props));

    act(() => {
      result.current.onSubmit();
    });

    await expect(result.current.open).toBeFalsy();
  });
});
