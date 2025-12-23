import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useAction from '../useAction';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/pages/Document/Bakes/elements/EditReviewer/hooks/useAction', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
  });

  const props = {
    onSubmit: jest.fn(),
    open: true,
    data: {
      customerApproval: [
        { name: 'x', position: 'x', email: 'x', phoneNumber: 'x' },
      ],
      telkomApproval: [
        { name: 'x', position: 'x', email: 'x', phoneNumber: 'x' },
      ],
      status: 'telkom approval',
    },
  };

  test('run properly', async () => {
    const { result } = await renderHook(() => useAction(props));

    act(() => {
      result.current.onSubmit({});
      result.current.submitToFetch({})();
      result.current.telkomApproval.onAdd();
      result.current.telkomApproval.onDelete(0)();
      result.current.customerApproval.onAdd();
      result.current.customerApproval.onDelete(0)();
    });

    await expect(result.current.control).toBeTruthy();
  });

  test('status customer approval', async () => {
    const { result } = await renderHook(() =>
      useAction({ data: { ...props.data, status: 'customer approval' } }),
    );

    await expect(result.current.control).toBeTruthy();
  });

  test('empty data', async () => {
    const { result } = await renderHook(() => useAction({ open: true }));

    await expect(result.current.control).toBeTruthy();
  });
});
