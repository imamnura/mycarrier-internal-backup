import { act, renderHook } from '@testing-library/react-hooks';
import useAction from '../useAction';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

jest.mock('@utils/hooks/usePopupConfirmation');

describe('src/pages/Document/Bakes/elements/UploadSignedBakes/hooks/useAction', () => {
  beforeAll(() => {
    usePopupConfirmation.mockReturnValue({
      closeConfirmation: jest.fn(),
      setConfirmation: jest.fn(),
    });
  });

  test('run properly', async () => {
    const { result } = await renderHook(() =>
      useAction({
        labelValidate: 'xxx',
        onSubmit: jest.fn(),
      }),
    );

    act(() => {
      result.current.onSubmit({});
      result.current.submitToFetch({})();
    });

    expect(result.current.control).toBeTruthy();
  });
});
