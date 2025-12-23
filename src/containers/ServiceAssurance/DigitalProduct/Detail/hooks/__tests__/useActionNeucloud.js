import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useActionNeucloud from '../useActionNeucloud';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/hooks/useActionNeucloud', () => {
  afterEach(cleanup);

  beforeAll(() => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
    });
  });

  test('run properly', async () => {
    const props = { data: {} };

    let res;

    await act(async () => {
      const { result } = await renderHook(() => useActionNeucloud(props));

      await result.current.handleFormTicketNumber({ type: 'Add' })();
      await result.current.handleFormUpdateStatus({ status: '' });
      await result.current.handleFormProgress();

      res = await result;
    });

    await expect(res.current).toBeTruthy();
  });
});
